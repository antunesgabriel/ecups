import { Document } from 'mongoose';
export declare class Notification extends Document {
    message: string;
    read: boolean;
    userId: number;
    link?: string;
}
