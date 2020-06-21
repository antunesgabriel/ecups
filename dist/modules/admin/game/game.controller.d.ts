import { Response } from 'express';
import { GameService } from './game.service';
import { GameCreateDTO } from './dto/game-create.dto';
import { GameUpdateDTO } from './dto/game-update.dto';
export declare class GameController {
    private readonly _gameService;
    constructor(_gameService: GameService);
    index(page: number, limit: number, res: Response): Promise<Response>;
    store(gameCreateDTO: GameCreateDTO, file: any, res: Response): Promise<Response>;
    update(gameId: number, gameUpdateDTO: GameUpdateDTO, file: any, res: Response): Promise<Response>;
    destoy(gameId: number, res: Response): Promise<Response>;
    all(res: Response): Promise<Response>;
}
