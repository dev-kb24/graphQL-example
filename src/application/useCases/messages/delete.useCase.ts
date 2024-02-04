import { Messages } from "../../../domain/entities/messages.entity";
import { MessagesInterface } from "../../interfaces/messages.interface";

export class DeleteUseCase{

    constructor(private readonly messageRepository: MessagesInterface) {}

    async execute(_id:string) : Promise<Messages | null>{
        try {
            const deletedMessages = await this.messageRepository.delete(_id);
            if(!deletedMessages) throw new Error('Messages not deleted');
            return deletedMessages;
        } catch (error) {
            throw error;
        }
    }
}