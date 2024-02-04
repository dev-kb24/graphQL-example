import { messageModel } from "../entities/messages.entity";
import { MessagesInterface } from "../../application/interfaces/messages.interface";
import { Model } from "mongoose";
import { Messages } from "../../domain/entities/messages.entity";

export class MessageRepository implements MessagesInterface{
    repository: Model<any>;
    constructor() {
        this.repository = messageModel;
    }

    async findAll() : Promise<Messages[]> {
        return await this.repository.find();
    }

    async create(name: string, description: string) : Promise<Messages> {
        return await this.repository.create({name, description});
    }

    async findById(_id: string) : Promise<Messages | null> {
        return await this.repository.findById(_id);
    }

    async update(_id: string, name: string, description: string) : Promise<Messages | null> {
        return await this.repository.findByIdAndUpdate(_id, {name, description}, {new: true});
    }

    async delete(_id: string) : Promise<Messages | null> {
        return await this.repository.findByIdAndDelete(_id);
    }
}