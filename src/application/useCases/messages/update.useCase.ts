import { Messages } from "../../../domain/entities/messages.entity";
import { MessagesInterface } from "../../interfaces/messages.interface";

export class UpdateUseCase{

    constructor(private readonly messageRepository: MessagesInterface) {}

    async execute(_id:string, name: string, description: string) : Promise<Messages | null>{
        try {
           const updatedMessage = await this.messageRepository.update(_id, name, description);
           if(!updatedMessage) throw new Error('Message not updated');
           return updatedMessage;
        } catch (error) {
            throw error;
        }
    }
}