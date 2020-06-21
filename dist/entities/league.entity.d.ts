import { GameEntity } from './game.entity';
import { LeagueTypeEntity } from './leagueType.entity';
import { UserEntity } from './user.entity';
export declare class LeagueEntity {
    leagueId: number;
    league: string;
    rules: string;
    description: string;
    roundTrip: boolean;
    maxParticipants: number;
    forTeams: boolean;
    leagueStart: Date;
    leagueEnd: Date;
    needAddress: boolean;
    started: boolean;
    active: boolean;
    thumb: string;
    selectGame: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    game: GameEntity;
    leagueType: LeagueTypeEntity;
    user: UserEntity;
}
