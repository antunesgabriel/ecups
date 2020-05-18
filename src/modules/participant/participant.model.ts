import { Document } from 'mongoose';
import { TeamEntity } from '@models/team.entity';
import { UserEntity } from '@models/user.entity';

export class Participant extends Document {
  leagueId: number;
  participants: Array<TeamEntity | UserEntity>;
  isTeams: boolean;
  numberOfParticipants?: number;
  creatorId: number;
}
