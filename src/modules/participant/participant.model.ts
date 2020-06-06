import { Document } from 'mongoose';
import { TeamEntity } from '@entities/team.entity';
import { UserEntity } from '@entities/user.entity';

export class Participant extends Document {
  leagueId: number;
  participants: Array<TeamEntity | UserEntity>;
  isTeams: boolean;
  numberOfParticipants?: number;
  creatorId: number;
}
