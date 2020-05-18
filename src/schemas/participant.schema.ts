import * as mongoose from 'mongoose';

export const ParticipantSchema = new mongoose.Schema(
  {
    leagueId: {
      type: Number,
      required: true,
    },
    participants: {
      type: Array,
      required: false,
      default: [],
    },
    isTeams: {
      type: Boolean,
      required: true,
    },
    numberOfParticipants: {
      type: Number,
      required: false,
      default: 0,
    },
    creatorId: {
      type: Number,
      required: 0,
    },
  },
  { timestamps: true },
);
