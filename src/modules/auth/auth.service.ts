import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '@models/user.entity';
import { classToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRespository: Repository<UserEntity>,
    private readonly _jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this._userRespository.findOne({
      where: { email: email },
      select: [
        'email',
        'password',
        'name',
        'surname',
        'avatar',
        'userId',
        'nickname',
      ],
      relations: ['role', 'address', 'team'],
    });

    if (!user) {
      throw new BadRequestException(
        'Email informado não possui cadastro na plataforma',
      );
    }

    if (!(await user.checkPassword(password))) {
      throw new UnauthorizedException('Senha incorreta');
    }

    return classToPlain(user);
  }

  async loginUser(payload): Promise<any> {
    const _token = this._jwtService.sign({
      email: payload.email,
      nickname: payload.nickname,
      userId: payload.userId,
      role: payload.role.role,
    });

    return { _token, user: payload };
  }
}
