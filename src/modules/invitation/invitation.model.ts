import { Document } from 'mongoose';

export class Invitation extends Document {
  teamId: number;
  userId: number;
  accept: boolean;
  teamName: string;
}
