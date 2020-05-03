import { Document } from 'mongoose';

export class NotificationMember extends Document {
  content: string;
  read?: boolean;
  member: number;
}
