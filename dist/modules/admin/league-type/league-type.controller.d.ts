import { Response } from 'express';
import { LeagueTypeService } from './league-type.service';
import { LeagueTypeDTO } from './dto/league-type.dto';
export declare class LeagueTypeController {
    private readonly _leagueTypeService;
    constructor(_leagueTypeService: LeagueTypeService);
    index(page: number, limit: number, res: Response): Promise<Response>;
    store(leagueTypeDTO: LeagueTypeDTO, res: Response): Promise<Response>;
    update(leagueTypeId: number, leagueTypeDTO: LeagueTypeDTO, res: Response): Promise<Response>;
    destoy(leagueTypeId: number, res: Response): Promise<Response>;
    all(res: Response): Promise<Response>;
}
