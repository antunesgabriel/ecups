import { Document } from 'mongoose';

export class TeamInvitationPlayer extends Document {
  team: number;
  player: number;
  accept: boolean;
  message: string;
}
