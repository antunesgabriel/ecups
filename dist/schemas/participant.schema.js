"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.ParticipantSchema = new mongoose.Schema({
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
        required: true,
    },
}, { timestamps: true });
//# sourceMappingURL=participant.schema.js.map