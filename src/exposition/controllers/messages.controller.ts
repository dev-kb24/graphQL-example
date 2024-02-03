import { GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { FindAllUseCase } from "../../application/useCases/messages/findAll.useCase";
import { AddMessageUseCase } from "../../application/useCases/messages/addMessage.useCase";
import { MessageRepository } from "../../infrastructure/repositories/messages.repository";
import { MessagesPresenter } from "../presenters/messages.presenters";
export class MessagesController {
    type: GraphQLObjectType;
    mutation: GraphQLObjectType;
    query: GraphQLObjectType;

    constructor(type: GraphQLObjectType){
        this.type = type;
        this.query = new GraphQLObjectType({
          name: 'Query',
          fields: {
            Messages: {
              type: new GraphQLList(this.type),
              async resolve() {
                const findAllUseCase = new FindAllUseCase(new MessageRepository());
                const messages = await findAllUseCase.execute();
                return messages.map( message => new MessagesPresenter(message).getPresenter());
              },
            },
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
                const addMessageUseCase = new AddMessageUseCase(new MessageRepository());
                const message = await addMessageUseCase.execute(args.name, args.description);
                return new MessagesPresenter(message).getPresenter();
              },
            },
          },
        });
    }

    public exec() : GraphQLSchema {
        return new GraphQLSchema({
            query: this.query,
            mutation: this.mutation
        });
    }
}

