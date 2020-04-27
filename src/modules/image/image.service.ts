import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PlayerRepository } from '@modules/player/player.repository';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(PlayerRepository)
    private readonly _playerRepository: PlayerRepository,
  ) {}

  async save(to: string, filename: string, player: any): Promise<any> {
    if (to === 'player') {
      const result = await this._playerRepository.update(
        { email: player.email },
        { avatar: filename },
      );

      if (result.affected) {
        return { message: 'Perfil atualizado' };
      }

      throw new BadRequestException('Falha ao atualizar imagem de perfil');
    }
  }
}
