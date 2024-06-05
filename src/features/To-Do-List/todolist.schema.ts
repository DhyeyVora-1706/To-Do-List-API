import mongoose from "mongoose";

export const todolistSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, "task is required"]
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "userId is required"]
    }
})