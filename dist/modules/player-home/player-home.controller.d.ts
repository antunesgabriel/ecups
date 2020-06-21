import { Response } from 'express';
import { IUser } from '@utils/user.interface';
import { PlayerHomeService } from './player-home.service';
export declare class PlayerHomeController {
    private readonly _playerHomeService;
    constructor(_playerHomeService: PlayerHomeService);
    index(res: Response, authUser: IUser): Promise<Response>;
}
