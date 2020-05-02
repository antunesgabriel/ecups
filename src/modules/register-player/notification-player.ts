import { Document } from 'mongoose';

export class NotificationPlayer extends Document {
  content: string;
  read?: boolean;
  player: number;
}
