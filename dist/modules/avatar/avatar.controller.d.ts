import { Response } from 'express';
import { UserService } from '@modules/user/user.service';
import { IUser } from '@utils/user.interface';
export declare class AvatarController {
    private readonly _userService;
    constructor(_userService: UserService);
    store(file: any, res: Response, user: IUser): Promise<Response>;
}
