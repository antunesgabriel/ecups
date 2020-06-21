import { Model } from 'mongoose';
import { Subscription } from './subscription.model';
import { UserService } from '@modules/user/user.service';
import { LeagueService } from '@modules/league/league.service';
import { TeamService } from '@modules/team/team.service';
import { IUser } from '@utils/user.interface';
import { UserEntity } from '@entities/user.entity';
import { SubscriptionCreateDTO } from './dto/subscription-create.dto';
import { LeagueEntity } from '@entities/league.entity';
import { ParticipantService } from '@modules/participant/participant.service';
import { SubscriptionUpdateDTO } from './dto/subscription-update.dto';
import { NotificationService } from '@modules/notification/notification.service';
export declare class SubscriptionService {
    private readonly _subscriptionModel;
    private readonly _userService;
    private readonly _leagueService;
    private readonly _teamService;
    private readonly _participantService;
    private readonly _notificationService;
    constructor(_subscriptionModel: Model<Subscription>, _userService: UserService, _leagueService: LeagueService, _teamService: TeamService, _participantService: ParticipantService, _notificationService: NotificationService);
    index(like: string, authUser: IUser): Promise<Subscription[]>;
    create(subscriptionDTO: SubscriptionCreateDTO, authUser: IUser): Promise<Subscription[]>;
    update(subscriptionDTO: SubscriptionUpdateDTO, authUser: IUser): Promise<{
        message: string;
        requests: Subscription[];
    }>;
    private indexLikeAPlayer;
    private indexLikeAOrganizer;
    subscribeTeam(player: UserEntity, league: LeagueEntity): Promise<Subscription[]>;
    subscribePlayer(player: UserEntity, league: LeagueEntity): Promise<Subscription[]>;
}
