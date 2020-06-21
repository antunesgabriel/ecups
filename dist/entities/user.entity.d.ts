import { AddressEntity } from './address.entity';
import { RoleEntity } from './role.entity';
import { LeagueEntity } from './league.entity';
import { TeamEntity } from './team.entity';
export declare class UserEntity {
    userId: number;
    name: string;
    surname: string;
    email: string;
    nickname: string;
    password: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
    address: AddressEntity;
    role: RoleEntity;
    leagues: LeagueEntity[];
    team: TeamEntity;
    myTeam: TeamEntity;
    hashPassword(pass: string | undefined): Promise<string>;
    checkPassword(password: string): Promise<boolean>;
}
