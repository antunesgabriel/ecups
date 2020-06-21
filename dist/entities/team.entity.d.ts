import { UserEntity } from './user.entity';
export declare class TeamEntity {
    teamId: number;
    team: string;
    shield: string;
    bio: string;
    deletedAt: Date;
    members: UserEntity[];
    boss: UserEntity;
}
