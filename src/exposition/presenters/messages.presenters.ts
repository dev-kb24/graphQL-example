import { Messages } from "../../domain/entities/messages.entity";

export class MessagesPresenter {
    id: string;
    name: string;
    desription: string;

    constructor(message: Messages) {
        this.name = message.name;
        this.desription = message.description;
    }

    getPresenter() {
        return {
            name: this.name,
            description: this.desription
        }
    }
    
}