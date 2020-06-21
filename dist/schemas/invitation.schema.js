"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moongose = require("mongoose");
exports.InvitationSchema = new moongose.Schema({
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
}, { timestamps: true });
//# sourceMappingURL=invitation.schema.js.map