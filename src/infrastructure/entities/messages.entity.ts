import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    name: String,
    description: String
})

export const messageModel = mongoose.model('Messages', messageSchema);