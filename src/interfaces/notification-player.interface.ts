import { Document } from 'mongoose';

export class INotificationPlayer extends Document {
  content: string;
  read?: boolean;
  player: number;
}
