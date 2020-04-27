import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import { PlayerService } from '@modules/player/player.service';
import { JwtService } from '@nestjs/jwt';
import { PlayerEntity } from '@models/player.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly _playerService: PlayerService,
    private readonly _jwtService: JwtService,
  ) {}

  async validatePlayer(email: string, password: string): Promise<PlayerEntity> {
    const player = await this._playerService.findByEmail(email);

    if (!player) {
      throw new BadRequestException(
        'Email informado não possui cadastro na plataforma',
      );
    }

    if (!(await player.checkPassword(password))) {
      throw new UnauthorizedException('Senha incorreta');
    }

    return player;
  }

  async loginPlayer(payload): Promise<any> {
    const _token = this._jwtService.sign({
      email: payload.email,
      nickName: payload.nickName,
      team: payload.team ? payload.team.name : null,
      isPlayer: true,
    });

    return { _token, player: payload };
  }
}
