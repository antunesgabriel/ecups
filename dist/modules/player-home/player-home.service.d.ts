import { LeagueRepository } from '@modules/league/league.repository';
import { ParticipantService } from '@modules/participant/participant.service';
import { IUser } from '@utils/user.interface';
import { UserService } from '@modules/user/user.service';
export declare class PlayerHomeService {
    private readonly _leagueRepository;
    private readonly _participantService;
    private readonly _userService;
    constructor(_leagueRepository: LeagueRepository, _participantService: ParticipantService, _userService: UserService);
    show(authUser: IUser): Promise<{
        leaguesCount: number;
        participations: number;
    }>;
}
