import { Response } from 'express';
import { UserService } from './user.service';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserUpdateDTO } from './dto/user-update.dto';
import { IUser } from '@utils/user.interface';
export declare class UserController {
    private readonly _userService;
    constructor(_userService: UserService);
    index(page: number, limit: number, res: Response): Promise<Response>;
    store(userCreateDTO: UserCreateDTO, res: Response): Promise<Response>;
    update(userId: number, userUpdateDTO: UserUpdateDTO, res: Response, user: IUser): Promise<Response>;
    destoy(userId: number, res: Response): Promise<Response>;
}
