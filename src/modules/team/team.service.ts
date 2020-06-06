import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamRepository } from './team.repository';
import { UserService } from '@modules/user/user.service';
import { TeamDTO } from './dto/team.dto';
import { IUser } from '@utils/user.interface';
import { UserEntity } from '@entities/user.entity';
import { IFeedback } from '@interfaces/feedback.interface';
import {
  Pagination,
  IPaginationOptions,
  paginate,
} from 'nestjs-typeorm-paginate';
import { TeamEntity } from '@entities/team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamRepository)
    private readonly _teamRepository: TeamRepository,
    private readonly _userService: UserService,
  ) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<TeamEntity>> {
    const query = this._teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.members', 'members')
      .orderBy('team.teamId', 'ASC');

    return paginate<TeamEntity>(query, options);
  }

  async create(teamDTO: TeamDTO, authUser: IUser): Promise<any> {
    teamDTO.team = teamDTO.team.trim();
    const user = await this._userService.findByNickname(authUser.nickname);

    if (user.team) {
      throw new BadRequestException(
        'Você não pode criar um time pois já faz parte de um',
      );
    }

    if (await this._teamRepository.findOne({ team: teamDTO.team })) {
      throw new BadRequestException('Já existe um time com este nome');
    }
    const newTeam = this._teamRepository.create(teamDTO);
    newTeam.boss = user;
    newTeam.members = [user];

    const team = await this._teamRepository.save(newTeam);
    delete team.members;
    delete team.boss;
    return { message: 'Time criado com sucesso', team };
  }

  async update(
    teamId: number,
    teamDTO: TeamDTO,
    authUser: IUser,
  ): Promise<any> {
    teamDTO.team = teamDTO.team.trim();
    const team = await this._teamRepository.findOne({ teamId });
    const user = await this._userService.findByNickname(authUser.nickname);

    if (!team) {
      throw new NotFoundException('Time não encotrado');
    }

    if (team.teamId !== user.team.teamId) {
      throw new NotFoundException('Você não faz parte deste time');
    }

    if (!(await this.isBoss(teamId, user))) {
      throw new BadRequestException(
        'Somente o lider do time pode fazer alterações',
      );
    }

    if (
      teamDTO.team !== team.team &&
      (await this._teamRepository.findOne({ team: teamDTO.team }))
    ) {
      throw new BadRequestException('Ja existe um time com este nome');
    }

    team.team = teamDTO.team;
    team.bio = teamDTO.bio;

    const reloaded = await this._teamRepository.save(team);

    delete reloaded.members;
    delete reloaded.boss;

    return { message: 'Time atualizado', team: reloaded };
  }

  async destroy(teamId: number, authUser: IUser): Promise<IFeedback> {
    const team = await this._teamRepository.findOne({ teamId });

    if (!team) {
      throw new NotFoundException('Time não encotrado');
    }

    const user = await this._userService.findByNickname(authUser.nickname);

    if (!(await this.isBoss(teamId, user))) {
      throw new BadRequestException(
        'Somente o lider do time pode excluir o time',
      );
    }

    await this._teamRepository.softDelete(team);

    return { message: 'time excluido' };
  }

  async updateShield(
    teamId: number,
    filename: string,
    authUser: IUser,
  ): Promise<any> {
    const team = await this._teamRepository.findOne({ teamId });

    if (!team) {
      throw new NotFoundException('Time não encotrado');
    }

    const user = await this._userService.findByNickname(authUser.nickname);

    if (!(await this.isBoss(teamId, user))) {
      throw new BadRequestException(
        'Somente o lider do time pode alterar o escudo',
      );
    }

    team.shield = filename;

    await this._teamRepository.save(team);

    return { message: 'Escudo atualizado', filename };
  }

  async show(authUser: IUser): Promise<any> {
    const user = await this._userService.findByNickname(authUser.nickname);

    if (!user.team) {
      throw new BadRequestException(
        'Você não faz parte de um time, crie um ou aceite o convite de algum time',
      );
    }

    const team = await this._teamRepository.findOne({
      where: { teamId: user.team.teamId },
      relations: ['boss', 'members'],
    });

    return { team };
  }

  async isBoss(teamId: number, user: UserEntity): Promise<TeamEntity | null> {
    return await this._teamRepository.findOne({
      where: { teamId, boss: user },
      relations: ['boss', 'members'],
    });
  }

  async findById(teamId: number): Promise<TeamEntity | null> {
    return await this._teamRepository.findOne({
      where: { teamId },
      relations: ['boss', 'members'],
    });
  }

  async save(team: TeamEntity): Promise<TeamEntity> {
    return await this._teamRepository.save(team);
  }
}
