import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { UserEntity } from '@entities/user.entity';
import { UserRepository } from './user.repository';
import { UserUpdateDTO } from './dto/user-update.dto';
import { UserCreateDTO } from './dto/user-create.dto';
import { IFeedback } from '@interfaces/feedback.interface';
import { RoleService } from '@modules/admin/role/role.service';
import { IUser } from '@utils/user.interface';
import { AuthService } from '@modules/auth/auth.service';
import { AddressEntity } from '@entities/address.entity';
import { TeamEntity } from '@entities/team.entity';
import { UpdateResult } from 'typeorm';
export declare class UserService {
    private readonly _userRepository;
    private readonly _roleService;
    private readonly _authService;
    constructor(_userRepository: UserRepository, _roleService: RoleService, _authService: AuthService);
    index(options: IPaginationOptions): Promise<Pagination<UserEntity>>;
    create(user: UserCreateDTO): Promise<IFeedback>;
    update(userId: number, user: UserUpdateDTO, userAuth: IUser): Promise<any>;
    destroy(userId: number): Promise<IFeedback>;
    private validateEmailNickname;
    updateAvatar(filename: string, user: IUser): Promise<string>;
    findByNickname(nickname: string): Promise<UserEntity | null>;
    addAddress(address: AddressEntity, nickname: string): Promise<number>;
    info(): Promise<any>;
    setTeam(user: UserEntity, team: TeamEntity): Promise<UpdateResult>;
}
