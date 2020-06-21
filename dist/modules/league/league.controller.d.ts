import { Response } from 'express';
import { LeagueService } from './league.service';
import { IUser } from '@utils/user.interface';
import { LeagueCreateDTO } from './dto/league-create.dto';
import { LeagueUpdateDTO } from './dto/league-update.dto';
export declare class LeagueController {
    private readonly _leagueService;
    constructor(_leagueService: LeagueService);
    index(page: number, limit: number, res: Response, user: IUser): Promise<Response>;
    store(leagueCreateDTO: LeagueCreateDTO, res: Response, user: IUser): Promise<Response>;
    update(leagueUpdateDTO: LeagueUpdateDTO, res: Response, user: IUser, leagueId: number): Promise<Response>;
    destroy(res: Response, user: IUser, leagueId: number): Promise<Response>;
    show(leagueId: number, res: Response): Promise<Response>;
    all(page: number, limit: number, leagueId: number | undefined, res: Response): Promise<Response>;
}
