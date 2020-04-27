import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain } from 'class-transformer';

import { PlayerRepository } from './player.repository';
import { PlayerCreateDTO } from './dto/player-create.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerRepository)
    private readonly _playerRepository: PlayerRepository,
  ) {}

  async create(player: PlayerCreateDTO) {
    if (await this._playerRepository.findOne({ email: player.email })) {
      throw new BadRequestException(
        `O email: ${player.email} já está sendo usado`,
      );
    }

    if (await this._playerRepository.findOne({ nickName: player.nickName })) {
      throw new BadRequestException(
        `O nick name: ${player.nickName} já está sendo usado`,
      );
    }

    const newPlayer = this._playerRepository.create(player);

    const saved = await this._playerRepository.save(newPlayer);

    return classToPlain(saved);
  }
}
