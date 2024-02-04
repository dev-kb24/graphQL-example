import { Messages } from "../../domain/entities/messages.entity";

export interface MessagesInterface {
    findAll(): Promise<Messages[]>
    create(name: string, description: string): Promise<Messages>
    findById(_id: string): Promise<Messages | null>
    update(_id: string, name: string, description: string): Promise<Messages | null>
    delete(_id: string): Promise<Messages | null>
}