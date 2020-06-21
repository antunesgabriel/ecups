import { Response } from 'express';
import { SubscriptionService } from './subscription.service';
import { IUser } from '@utils/user.interface';
import { SubscriptionCreateDTO } from './dto/subscription-create.dto';
import { SubscriptionUpdateDTO } from './dto/subscription-update.dto';
export declare class SubscriptionController {
    private readonly _subscriptionService;
    constructor(_subscriptionService: SubscriptionService);
    index(res: Response, like: string, authUser: IUser): Promise<Response>;
    store(res: Response, authUser: IUser, subscriptionDTO: SubscriptionCreateDTO): Promise<Response<any>>;
    update(res: Response, authUser: IUser, subscriptionDTO: SubscriptionUpdateDTO): Promise<Response<any>>;
}
