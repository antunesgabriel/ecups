import { Model } from 'mongoose';
import { Notification } from './notification.model';
import { IUser } from '@utils/user.interface';
import { NotificationCreateDTO } from './dto/notification-create.dto';
export declare class NotificationService {
    private readonly _notificationModel;
    constructor(_notificationModel: Model<Notification>);
    index(authUser: IUser): Promise<Notification[]>;
    create(notificationDTO: NotificationCreateDTO): Promise<any>;
    update(authUser: IUser): Promise<void>;
}
