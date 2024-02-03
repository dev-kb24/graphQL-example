import { MessagesInterface } from "../../interfaces/messages.interface";

export class AddMessageUseCase{

    constructor(private readonly messageRepository: MessagesInterface) {}

    async execute(name: string, description: string) {
        try {
            const createdMessage = await this.messageRepository.create(name, description);
            if(!createdMessage) throw new Error('Message not created');
            return createdMessage;
        } catch (error) {
            throw error;
        }
    }
}