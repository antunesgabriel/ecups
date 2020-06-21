"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.SubscriptionSchema = new mongoose.Schema({
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
//# sourceMappingURL=subscription.schema.js.map