import { MessagesInterface } from "../../interfaces/messages.interface";

export class FindByIdUseCase{

    constructor(private readonly messageRepository: MessagesInterface) {}

    async execute(_id:string) {
        try {
           const foundMessage = await this.messageRepository.findById(_id);
           if(!foundMessage) throw new Error('Message not found');
           return foundMessage;
        } catch (error) {
            throw error;
        }
    }
}