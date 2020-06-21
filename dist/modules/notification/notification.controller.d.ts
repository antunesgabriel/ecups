import { Response } from 'express';
import { NotificationService } from './notification.service';
import { IUser } from '@utils/user.interface';
export declare class NotificationController {
    private readonly _notificationService;
    constructor(_notificationService: NotificationService);
    index(res: Response, user: IUser): Promise<Response>;
    update(res: Response, user: IUser): Promise<Response>;
}
