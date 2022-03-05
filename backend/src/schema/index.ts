import { makeExecutableSchema } from "@graphql-tools/schema";

import UserTypeDefs from "./user/typedefs";
import CommonTypeDefs from "./common/typeDefs";

import UserResolvers from "./user/resolvers";


const typeDefs = [
  CommonTypeDefs,
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