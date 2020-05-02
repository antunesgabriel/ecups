import { Document } from 'mongoose';

export class TeamInvitationPlayer extends Document {
  team: number;
  player: string;
  accept: boolean;
  message: string;
  read: boolean;
}
