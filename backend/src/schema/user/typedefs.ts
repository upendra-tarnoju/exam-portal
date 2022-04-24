import { gql } from "apollo-server";

const userTypeDef = gql`
  input LoginCredentials {
    email: EmailAddress!
    password: String!
  }

  input College {
    id: ID!
    name: String!
  }
  
  input SignupUserInput {
    firstName: String!
    lastName: String!
    email: EmailAddress!
  }

  type LoginSuccessResponse {
    token: String!
    userType: String!
    lastLogin: String!
  }

  union LoginResponse = LoginSuccessResponse | ResponseError

  type Query {
    login(input: LoginCredentials): LoginResponse!
  }

  extend type Mutation {
    signup(input: SignupUserInput!): Status!
  }
`;

export default userTypeDef;