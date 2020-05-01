import * as mongoose from 'mongoose';

export const NotificationMemberSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
    member: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);
