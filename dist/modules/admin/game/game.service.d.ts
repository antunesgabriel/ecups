import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { GameRepository } from './game.repository';
import { GameEntity } from '@entities/game.entity';
import { IFeedback } from '@interfaces/feedback.interface';
import { GameCreateDTO } from './dto/game-create.dto';
import { GameUpdateDTO } from './dto/game-update.dto';
export declare class GameService {
    private readonly _gameRepository;
    constructor(_gameRepository: GameRepository);
    index(options: IPaginationOptions): Promise<Pagination<GameEntity>>;
    create(game: GameCreateDTO): Promise<IFeedback>;
    update(gameId: number, game: GameUpdateDTO): Promise<IFeedback>;
    destroy(gameId: number): Promise<IFeedback>;
    all(): Promise<GameEntity[]>;
    findById(gameId: number): Promise<GameEntity | null>;
}
