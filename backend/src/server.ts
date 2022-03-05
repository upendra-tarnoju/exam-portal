import "dotenv/config";
import { ApolloServer } from "apollo-server";

import { schema } from "./schema";
import MongooseConnectPlugin from "./plugins/MongooseConnect";

const server = new ApolloServer({
  schema,
  plugins: [MongooseConnectPlugin]
});

server.listen().then(({url}) =>{
  console.log(`🚀Server ready at ${url}`);
})