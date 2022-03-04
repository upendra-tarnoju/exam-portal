import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => {data: 'Hello'},
  },
};

const server = new ApolloServer({
  typeDefs, resolvers
});

server.listen().then(({url}) =>{
  console.log(`🚀Server ready at ${url}`);
})