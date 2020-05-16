import { Document } from 'mongoose';

export class Notification extends Document {
  message: string;
  read: boolean;
  userId: number;
  link: string;
}
