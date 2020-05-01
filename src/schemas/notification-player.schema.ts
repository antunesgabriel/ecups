import * as mongoose from 'mongoose';

export const NotificationPlayerSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    player: {
      type: Number,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
