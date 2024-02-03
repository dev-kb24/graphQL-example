import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String
})

export const messageModel = mongoose.model('Messages', messageSchema);