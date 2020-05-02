import * as mongoose from 'mongoose';

export const TeamInvitationPlayerSchema = new mongoose.Schema(
  {
    team: {
      type: Number,
      required: true,
    },
    player: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: false,
    },
    accept: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  { timestamps: true },
);
