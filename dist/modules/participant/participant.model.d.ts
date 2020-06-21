import { Document } from 'mongoose';
import { TeamEntity } from '@entities/team.entity';
import { UserEntity } from '@entities/user.entity';
export declare class Participant extends Document {
    leagueId: number;
    participants: Array<TeamEntity | UserEntity>;
    isTeams: boolean;
    numberOfParticipants?: number;
    creatorId: number;
}
