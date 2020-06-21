import { Response } from 'express';
import { LeagueService } from '@modules/league/league.service';
import { IUser } from '@utils/user.interface';
export declare class LeagueThumbController {
    private readonly _leagueService;
    constructor(_leagueService: LeagueService);
    update(file: any, res: Response, leagueId: number, user: IUser): Promise<Response>;
}
