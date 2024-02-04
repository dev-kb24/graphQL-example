import { Messages } from "../../../domain/entities/messages.entity";
import { MessagesInterface } from "../../interfaces/messages.interface";

export class FindAllUseCase{

    constructor(private readonly messageRepository: MessagesInterface) {}

    async execute() : Promise<Messages[]> {
        try {
            const foundMessages = await this.messageRepository.findAll();
            if(!foundMessages) throw new Error('Messages not found');
            return foundMessages;
        } catch (error) {
            throw error;
        }
    }
}