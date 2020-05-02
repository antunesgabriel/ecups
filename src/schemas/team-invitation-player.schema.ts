import * as mongoose from 'mongoose';

export const TeamInvitationPlayerSchema = new mongoose.Schema(
  {
    team: {
      type: Number,
      required: true,
    },
    player: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: false,
    },
    accept: {
      type: Boolean,
      require: true,
      default: null,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);
