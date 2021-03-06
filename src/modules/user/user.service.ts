import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { UserEntity } from '@entities/user.entity';
import { UserRepository } from './user.repository';

import { UserUpdateDTO } from './dto/user-update.dto';
import { UserCreateDTO } from './dto/user-create.dto';
import { IFeedback } from '@interfaces/feedback.interface';
import { RoleService } from '@modules/admin/role/role.service';
import { IUser } from '@utils/user.interface';
import { AuthService } from '@modules/auth/auth.service';
import { AddressEntity } from '@entities/address.entity';
import { subDays } from 'date-fns';
import { calcPorcentage } from '@helpers/porcentage';
import { TeamEntity } from '@entities/team.entity';
import { UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    private readonly _roleService: RoleService,
    private readonly _authService: AuthService,
  ) {}

  async index(options: IPaginationOptions): Promise<Pagination<UserEntity>> {
    const playerRole = await this._roleService.findOrCreate('PLAYER');

    const query = this._userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role')
      .where(`role.role_id = ${playerRole.roleId}`)
      .orderBy('user.name', 'ASC');

    return paginate<UserEntity>(query, options);
  }

  async create(user: UserCreateDTO): Promise<IFeedback> {
    user.nickname = user.nickname.replace(/[\s\W]/gi, '');
    const isValid = await this.validateEmailNickname(user.email, user.nickname);

    if (isValid) {
      throw new BadRequestException(isValid);
    }

    const role = await this._roleService.findOrCreate('PLAYER');

    await this._userRepository.save(
      this._userRepository.create({ ...user, role }),
    );

    return { message: 'Sua conta foi criada com sucesso!' };
  }

  async update(
    userId: number,
    user: UserUpdateDTO,
    userAuth: IUser,
  ): Promise<any> {
    let selectUser: UserEntity;

    if (userAuth.role === 'PLAYER') {
      selectUser = await this._userRepository.findOne({
        where: { nickname: userAuth.nickname },
        select: [
          'avatar',
          'name',
          'nickname',
          'password',
          'email',
          'surname',
          'userId',
        ],
      });
    }

    if (userAuth.role === 'ADMIN') {
      selectUser = await this._userRepository.findOne({
        where: { userId },
        select: [
          'avatar',
          'name',
          'nickname',
          'password',
          'email',
          'surname',
          'userId',
        ],
      });

      if (!selectUser) {
        throw new BadRequestException('Usuario informado não possui cadastro');
      }
    }

    if (user.password && !user.oldPassword) {
      throw new BadRequestException('Senha de confirmação invalida');
    }

    if (user.password && !(await selectUser.checkPassword(user.oldPassword))) {
      throw new BadRequestException('Senha de confirmação incorreta');
    }

    if (user.password && (await selectUser.checkPassword(user.oldPassword))) {
      user.password = await selectUser.hashPassword(user.password);
    }

    delete user.oldPassword;

    if (!user.password) {
      delete user.password;
    }

    if (
      user.email !== selectUser.email &&
      (await this.validateEmailNickname(user.email, null))
    ) {
      throw new BadRequestException(
        'Já existe um usuario cadastrado com este email',
      );
    }

    if (user.nickname !== selectUser.nickname) {
      user.nickname = user.nickname.replace(/[\s\W]/gi, '');
    }

    if (
      user.nickname !== selectUser.nickname &&
      (await this.validateEmailNickname(null, user.nickname))
    ) {
      throw new BadRequestException(
        'Já existe um usuario cadastrado com este nickname',
      );
    }

    await this._userRepository.update({ userId: selectUser.userId }, user);

    const updatedUser = await this._userRepository.findOne({
      where: { userId: selectUser.userId },
      relations: ['role', 'address', 'team'],
    });

    const payload = await this._authService.loginUser(updatedUser);

    return { message: 'Informações atualizadas', ...payload };
  }

  async destroy(userId: number): Promise<IFeedback> {
    if (!(await this._userRepository.findOne({ userId }))) {
      throw new BadRequestException('O usuario informado não existe');
    }

    await this._userRepository.delete({ userId });

    return { message: 'Usuario excluida com succeso' };
  }

  private async validateEmailNickname(
    email: string | null,
    nickname: string | null,
  ): Promise<string | boolean> {
    let message: string | boolean;

    message = false;

    if (email && (await this._userRepository.findOne({ email }))) {
      message = 'Já existe um usuario cadastrado com este email';
    }

    if (nickname && (await this._userRepository.findOne({ nickname }))) {
      message = 'Já existe um usuario cadastrado com este nickname';
    }

    return message;
  }

  async updateAvatar(filename: string, user: IUser): Promise<string> {
    await this._userRepository.update(
      { userId: user.userId },
      { avatar: filename },
    );

    return filename;
  }

  async findByNickname(nickname: string): Promise<UserEntity | null> {
    return await this._userRepository.findOne({
      where: { nickname },
      relations: ['role', 'address', 'team'],
    });
  }

  async addAddress(address: AddressEntity, nickname: string): Promise<number> {
    const result = await this._userRepository.update({ nickname }, { address });

    return result.affected;
  }

  async info(): Promise<any> {
    const now = new Date();
    const before = subDays(now, 30);
    const beforeBefore = subDays(before, 30);

    const queryValorFinal = this._userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role')
      .where('user.createdAt BETWEEN :before AND :now', {
        before,
        now,
      });

    const queryValorInicial = this._userRepository
      .createQueryBuilder('user')
      .where('user.createdAt BETWEEN :beforeBefore AND :before', {
        beforeBefore,
        before,
      });

    const [[users, final], inicial, total] = await Promise.all([
      queryValorFinal.getManyAndCount(),
      queryValorInicial.getCount(),
      this._userRepository.count(),
    ]);

    const porcentage = calcPorcentage(inicial, final);

    return {
      actual: final,
      before: inicial,
      porcentage,
      total,
      users,
    };
  }

  async setTeam(user: UserEntity, team: TeamEntity): Promise<UpdateResult> {
    return await this._userRepository.update({ userId: user.userId }, { team });
  }
}
