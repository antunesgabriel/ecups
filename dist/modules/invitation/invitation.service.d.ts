import { Model } from 'mongoose';
import { Invitation } from './invitation.model';
import { NotificationService } from '@modules/notification/notification.service';
import { TeamService } from '@modules/team/team.service';
import { UserService } from '@modules/user/user.service';
import { InvitationCreateDTO } from './dto/invitation-create.dto';
import { IFeedback } from '@interfaces/feedback.interface';
import { IUser } from '@utils/user.interface';
import { InvitationUpdateDTO } from './dto/invitation-update.dto';
export declare class InvitationService {
    private readonly _invitationModel;
    private readonly _notificationService;
    private readonly _userService;
    private readonly _teamService;
    constructor(_invitationModel: Model<Invitation>, _notificationService: NotificationService, _userService: UserService, _teamService: TeamService);
    index(authUser: IUser): Promise<Invitation[]>;
    create(invitationCreateDTO: InvitationCreateDTO, authUser: IUser): Promise<IFeedback>;
    update(invitationUpdateDTO: InvitationUpdateDTO, authUser: any): Promise<any>;
}
