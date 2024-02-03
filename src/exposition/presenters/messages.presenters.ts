import { Messages } from "../../domain/entities/messages.entity";

export class MessagesPresenter {
    _id: string;
    name: string;
    desription: string;

    constructor(message: Messages) {
        this._id = message._id;
        this.name = message.name;
        this.desription = message.description;
    }

    getPresenter() {
        return {
            _id: this._id,
            name: this.name,
            description: this.desription
        }
    }
    
}