import { MessagesInterface } from "../../interfaces/messages.interface";

export class FindAllUseCase{

    constructor(private readonly messageRepository: MessagesInterface) {}

    async execute() {
        try {
            const foundMessages = await this.messageRepository.findAll();
            if(!foundMessages) throw new Error('Messages not found');
            return foundMessages;
        } catch (error) {
            throw error;
        }
    }
}