import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { FindAllUseCase } from "../../application/useCases/messages/findAll.useCase";
import { AddMessageUseCase } from "../../application/useCases/messages/addMessage.useCase";
import { MessageRepository } from "../../infrastructure/repositories/messages.repository";
import { MessagesPresenter } from "../presenters/messages.presenters";
import { FindByIdUseCase } from "../../application/useCases/messages/findById.useCase";
import { UpdateUseCase } from "../../application/useCases/messages/update.useCase";
import { DeleteUseCase } from "../../application/useCases/messages/delete.useCase";

export class MessagesController {
    type: GraphQLObjectType;
    mutation: GraphQLObjectType;
    query: GraphQLObjectType;

    constructor(type: GraphQLObjectType){
        this.type = type;
        const self = this;
        this.query = new GraphQLObjectType({
          name: 'Query',
          fields: {
            messages: {
              type: new GraphQLList(this.type),
              async resolve() {
                return self.findAll();
              },
            },
            message:{
              type: this.type,
              args: { _id: { type: GraphQLID } },
              async resolve(parent, args) {
                return self.findById(args._id);
              },
            }
          },
        });
        this.mutation = new GraphQLObjectType({
          name: 'Mutation',
          fields: {
            addMessage: {
              type: this.type,
              args: {
                name: { type: GraphQLString },
                description: { type: GraphQLString }
              },
              async resolve(parent, args) {
                return self.addMessage(args.name, args.description);
              },
            },
            updateMessage: {
              type:this.type,
              args: {
                _id: { type: GraphQLID },
                name: { type: GraphQLString },
                description: { type: GraphQLString }
              },
              async resolve(parent, args) {
                return self.updateMessage(args._id, args.name, args.description);
              }
            },
            deleteMessage: {
              type: this.type,
              args: { _id: { type: GraphQLID } },
              async resolve(parent, args) {
                return self.deleteMessage(args._id);
              }, 
            } 
          },
        });
    }

    public exec() : GraphQLSchema {
        return new GraphQLSchema({
            query: this.query,
            mutation: this.mutation
        });
    }

    private async findAll(){
      const findAllUseCase = new FindAllUseCase(new MessageRepository());
      const messages = await findAllUseCase.execute();
      return messages.map( message => new MessagesPresenter(message).getPresenter()); 
    }

    private async findById(_id: string){
      const findByIdUseCase = new FindByIdUseCase(new MessageRepository());
      const message = await findByIdUseCase.execute(_id);
      return new MessagesPresenter(message).getPresenter();
    }

    private async addMessage(name: string, description: string){
      const addMessageUseCase = new AddMessageUseCase(new MessageRepository());
      const message = await addMessageUseCase.execute(name, description);
      return new MessagesPresenter(message).getPresenter();
    }

    private async updateMessage(_id: string, name: string, description: string){
      const addMessageUseCase = new UpdateUseCase(new MessageRepository());
      const message = await addMessageUseCase.execute(_id, name, description);
      return new MessagesPresenter(message).getPresenter();
    }

    private async deleteMessage(_id: string){
      const deleteUseCase = new DeleteUseCase(new MessageRepository());
      const message = await deleteUseCase.execute(_id);
      return new MessagesPresenter(message).getPresenter();
    }
  

}

