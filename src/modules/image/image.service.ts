import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PlayerRepository } from '@modules/player/player.repository';
import { MemberService } from '@modules/member/member.service';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(PlayerRepository)
    private readonly _playerRepository: PlayerRepository,
    private readonly _memberService: MemberService,
  ) {}

  async save(to: string, filename: string, user: any): Promise<any> {
    if (to === 'player') {
      const result = await this._playerRepository.update(
        { email: user.email },
        { avatar: filename },
      );

      if (result.affected) {
        return { message: 'Perfil atualizado', hash: filename };
      }

      throw new BadRequestException('Falha ao atualizar imagem de perfil');
    }

    if (to === 'member') {
      const result = await this._memberService.update(user.email, {
        avatar: filename,
      });

      if (result.affected) {
        return { message: 'Perfil atualizado', hash: filename };
      }

      throw new BadRequestException('Falha ao atualizar imagem de perfil');
    }
  }
}
