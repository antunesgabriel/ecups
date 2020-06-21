import { Document } from 'mongoose';
import { LeagueEntity } from '@entities/league.entity';
import { TeamEntity } from '@entities/team.entity';
import { UserEntity } from '@entities/user.entity';
export declare class Subscription extends Document {
    league: LeagueEntity;
    team?: TeamEntity;
    player?: UserEntity;
    organizerId: number;
    status?: boolean;
    teamId?: number;
    playerId?: number;
    leagueId: number;
}
