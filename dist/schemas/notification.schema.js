"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.NotificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        required: true,
        default: false,
    },
    userId: {
        type: Number,
        required: true,
    },
    link: {
        type: String,
        required: false,
    },
}, { timestamps: true });
//# sourceMappingURL=notification.schema.js.map