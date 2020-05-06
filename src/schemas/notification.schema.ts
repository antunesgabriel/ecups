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
    user: {
      type: Number,
      required: true,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true },
);
