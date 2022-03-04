import { makeExecutableSchema } from "@graphql-tools/schema";

import UserTypeDefs from "./user/typedefs";

import UserResolvers from "./user/resolvers";


const typeDefs = [
  UserTypeDefs,
];

const resolvers = {
  Query: {
    ...UserResolvers.Query,
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})