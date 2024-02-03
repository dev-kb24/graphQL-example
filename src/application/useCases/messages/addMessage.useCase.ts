import { MessagesInterface } from "../../interfaces/messages.interface";

export class AddMessageUseCase{

    constructor(private readonly messageRepository: MessagesInterface) {}

    async execute(name: string, description: string) {
        return await this.messageRepository.create(name, description)
    }
}