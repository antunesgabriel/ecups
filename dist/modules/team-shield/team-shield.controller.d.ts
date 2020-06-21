import { Response } from 'express';
import { TeamService } from '@modules/team/team.service';
import { IUser } from '@utils/user.interface';
export declare class TeamShieldController {
    private readonly _teamService;
    constructor(_teamService: TeamService);
    update(file: any, res: Response, teamId: number, user: IUser): Promise<Response>;
}
