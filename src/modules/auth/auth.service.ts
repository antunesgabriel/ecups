import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import { PlayerService } from '@modules/player/player.service';
import { JwtService } from '@nestjs/jwt';
import { PlayerEntity } from '@models/player.entity';
import { MemberEntity } from '@models/member.entity';
import { MemberService } from '@modules/member/member.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly _playerService: PlayerService,
    private readonly _jwtService: JwtService,
    private readonly _memberService: MemberService,
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

  async validateMember(email: string, password: string): Promise<MemberEntity> {
    const member = await this._memberService.findByEmail(email);

    if (!member) {
      throw new UnauthorizedException('Você não possui cadastro na plataforma');
    }

    if (!(await member.checkPassword(password))) {
      throw new BadRequestException('Senha incorreta');
    }

    return member;
  }

  async loginPlayer(payload): Promise<any> {
    const _token = this._jwtService.sign({
      email: payload.email,
      nickName: payload.nickName,
      team: payload.team ? payload.team.teamId : null,
      isPlayer: true,
      playerId: payload.playerId,
    });

    return { _token, player: payload };
  }

  async loginMember(payload): Promise<any> {
    const _token = this._jwtService.sign({
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      organization: payload.organization ? payload.organization.nickname : null,
      // role: payload.role.role,
      isMember: true,
      memberId: payload.memberId,
    });

    return { _token, member: payload };
  }
}
