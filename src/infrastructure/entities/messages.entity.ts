import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},{timestamps: true})

export const messageModel = mongoose.model('Messages', messageSchema);