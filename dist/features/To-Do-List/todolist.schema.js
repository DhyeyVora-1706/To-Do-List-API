"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todolistSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.todolistSchema = new mongoose_1.default.Schema({
    task: {
        type: String,
        required: [true, "task is required"]
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, "userId is required"]
    }
});
