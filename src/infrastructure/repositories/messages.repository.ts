import { messageModel } from "../entities/messages.entity";
import { MessagesInterface } from "../../application/interfaces/messages.interface";
import { Model } from "mongoose";

export class MessageRepository implements MessagesInterface{
    repository: Model<any>;
    constructor() {
        this.repository = messageModel;
    }

    async findAll() {
        return await this.repository.find();
    }

    async create(name: string, description: string) {
        return await this.repository.create({name, description});
    }
}