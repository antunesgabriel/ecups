import { UserEntity } from './user.entity';
export declare class RoleEntity {
    roleId: number;
    role: string;
    users: UserEntity[];
}
