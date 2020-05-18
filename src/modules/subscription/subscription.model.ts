import { Document } from 'mongoose';
import { LeagueEntity } from '@models/league.entity';
import { TeamEntity } from '@models/team.entity';
import { UserEntity } from '@models/user.entity';

export class Subscription extends Document {
  league: LeagueEntity;
  team?: TeamEntity;
  player?: UserEntity;
  organizerId: number;
  status?: boolean;
  teamId?: number;
  playerId?: number;
  leagueId: number;
}
