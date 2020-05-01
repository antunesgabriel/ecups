import { Document } from 'mongoose';

export class INotificationMember extends Document {
  content: string;
  read?: boolean;
  member: number;
}
