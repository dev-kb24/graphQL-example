import { GraphQLObjectType, GraphQLString } from 'graphql';


export const messageType = new GraphQLObjectType({
  name: 'Message',
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  }),
});