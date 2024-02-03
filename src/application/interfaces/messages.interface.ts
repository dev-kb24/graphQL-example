import { Messages } from "../../domain/entities/messages.entity";

export interface MessagesInterface {
    findAll(): Promise<Messages[]>
    create(name: string, description: string): Promise<Messages>
}