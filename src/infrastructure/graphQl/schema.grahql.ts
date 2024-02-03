import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';


export const messageType = new GraphQLObjectType({
  name: 'Message',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  }),
});