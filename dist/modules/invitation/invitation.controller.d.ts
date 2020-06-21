import { Response } from 'express';
import { InvitationService } from './invitation.service';
import { IUser } from '@utils/user.interface';
import { InvitationCreateDTO } from './dto/invitation-create.dto';
import { InvitationUpdateDTO } from './dto/invitation-update.dto';
export declare class InvitationController {
    private readonly _invitationService;
    constructor(_invitationService: InvitationService);
    index(res: Response, authUser: IUser): Promise<Response>;
    store(res: Response, authUser: IUser, invitationDTO: InvitationCreateDTO): Promise<Response>;
    update(invitationDTO: InvitationUpdateDTO, authUser: IUser, res: Response): Promise<Response>;
}
