import { MessagesInterface } from "../../interfaces/messages.interface";

export class FindAllUseCase{

    constructor(private readonly messageRepository: MessagesInterface) {}

    async execute() {
        return await this.messageRepository.findAll();
    }
}