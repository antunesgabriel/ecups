import * as mongoose from 'mongoose';

export const SubscriptionSchema = new mongoose.Schema({
  league: {
    type: Object,
    require: true,
  },
  team: {
    type: Object,
    required: false,
    default: null,
  },
  player: {
    type: Object,
    required: false,
    default: null,
  },
  organizerId: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: false,
    default: null,
  },
  teamId: {
    type: Number,
    required: false,
    default: null,
  },
  playerId: {
    type: Number,
    required: false,
    default: null,
  },
  leagueId: {
    type: Number,
    required: true,
  },
});
