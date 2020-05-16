import * as mongoose from 'mongoose';

export const NotificationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
    userId: {
      type: Number,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);
