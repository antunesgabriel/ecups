import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { GameRepository } from './game.repository';
import { GameEntity } from '@entities/game.entity';
import { IFeedback } from '@interfaces/feedback.interface';
import { GameCreateDTO } from './dto/game-create.dto';
import { GameUpdateDTO } from './dto/game-update.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameRepository)
    private readonly _gameRepository: GameRepository,
  ) {}

  async index(options: IPaginationOptions): Promise<Pagination<GameEntity>> {
    const query = this._gameRepository
      .createQueryBuilder('game')
      .orderBy('game', 'ASC');

    return paginate<GameEntity>(query, options);
  }

  async create(game: GameCreateDTO): Promise<IFeedback> {
    if (await this._gameRepository.findOne({ game: game.game })) {
      throw new BadRequestException(
        'Um jogo com o mesmo nome ja foi adcionado',
      );
    }
    await this._gameRepository.save(this._gameRepository.create(game));

    return { message: 'Jogo adcionado a lista com sucesso' };
  }

  async update(gameId: number, game: GameUpdateDTO): Promise<IFeedback> {
    if (!(await this._gameRepository.findOne({ gameId }))) {
      throw new BadRequestException('O jogo informado não está cadastrado');
    }

    await this._gameRepository.update(
      { gameId },
      { game: game.game, logo: game.logo },
    );

    return { message: 'Informações de jogo atualizadas' };
  }

  async destroy(gameId: number): Promise<IFeedback> {
    if (!(await this._gameRepository.findOne({ gameId }))) {
      throw new BadRequestException('O jogo informado não está cadastrado');
    }

    await this._gameRepository.delete({ gameId });

    return { message: 'Jogo excluido com succeso' };
  }

  async all(): Promise<GameEntity[]> {
    const games = await this._gameRepository.find();
    return games;
  }

  async findById(gameId: number): Promise<GameEntity | null> {
    return await this._gameRepository.findOne({ gameId });
  }
}
