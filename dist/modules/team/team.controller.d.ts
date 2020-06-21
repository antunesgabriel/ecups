import { Response } from 'express';
import { TeamService } from './team.service';
import { TeamDTO } from './dto/team.dto';
import { IUser } from '@utils/user.interface';
export declare class TeamController {
    private readonly _teamService;
    constructor(_teamService: TeamService);
    index(res: Response, page?: number, limit?: number): Promise<Response>;
    store(teamDTO: TeamDTO, res: Response, authUser: IUser): Promise<Response>;
    update(teamDTO: TeamDTO, res: Response, authUser: IUser, teamId: number): Promise<Response>;
    destroy(res: Response, authUser: IUser, teamId: number): Promise<Response>;
    show(res: Response, authUser: IUser): Promise<Response>;
}
