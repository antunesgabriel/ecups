import * as moongose from 'mongoose';

export const InvitationSchema = new moongose.Schema(
  {
    teamId: {
      required: true,
      type: Number,
    },
    userId: {
      required: true,
      type: Number,
    },
    accept: {
      type: Boolean,
      default: null,
    },
    teamName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
