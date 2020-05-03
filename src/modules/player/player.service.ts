import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain } from 'class-transformer';

import { PlayerRepository } from './player.repository';
import { PlayerCreateDTO } from './dto/player-create.dto';
import { PlayerEntity } from '@models/player.entity';
import { TeamEntity } from '@models/team.entity';
import { te } from 'date-fns/locale';

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

  async findByEmail(email: string): Promise<PlayerEntity | null> {
    return this._playerRepository.findOne({
      where: { email },
      relations: ['team', 'leaderOf'],
      select: [
        'team',
        'active',
        'avatar',
        'birthDate',
        'cpf',
        'firstName',
        'lastName',
        'password',
        'playerId',
        'rgEmitter',
        'rgNumber',
        'rgUf',
        'nickName',
        'email',
      ],
    });
  }

  async updateTeam(playerId: number, team: TeamEntity): Promise<boolean> {
    await this._playerRepository.update({ playerId }, { team });
    return true;
  }

  async findByNickName(nickName: string): Promise<PlayerEntity | null> {
    return await this._playerRepository.findOne({ nickName });
  }
}
