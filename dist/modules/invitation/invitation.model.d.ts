import { Document } from 'mongoose';
export declare class Invitation extends Document {
    teamId: number;
    userId: number;
    accept: boolean;
    teamName: string;
}
