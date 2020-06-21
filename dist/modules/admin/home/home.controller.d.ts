import { UserService } from '@modules/user/user.service';
import { LeagueService } from '@modules/league/league.service';
export declare class HomeController {
    private readonly _userService;
    private readonly _leagueService;
    constructor(_userService: UserService, _leagueService: LeagueService);
    index(): Promise<any>;
}
