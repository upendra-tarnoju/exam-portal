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
  
  input Signup {
    firstName: String!
    lastName: String!
    email: EmailAddress!
    password: String!
    mobileNumber: String!
    college: College!
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

  type Mutation {
    signup(input: Signup): Status!
  }
`;

export default userTypeDef;