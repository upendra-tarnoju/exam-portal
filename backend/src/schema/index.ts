import { makeExecutableSchema } from "@graphql-tools/schema";
import {
  typeDefs as ScalerTypeDefs,
  resolvers as ScalerResolvers,
} from "graphql-scalars";

import UserTypeDefs from "./user/typedefs";
import CommonTypeDefs from "./common/typedefs";

import UserResolvers from "./user/resolvers";


const typeDefs = [
  ScalerTypeDefs,
  CommonTypeDefs,
  UserTypeDefs,
];

const resolvers = {
  ...UserResolvers,
  ...ScalerResolvers,
  Query: {
    ...ScalerResolvers.Query,
    ...UserResolvers.Query,
  },
  Mutation: {
    ...ScalerResolvers.Mutation,
    ...UserResolvers.Mutation,
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})