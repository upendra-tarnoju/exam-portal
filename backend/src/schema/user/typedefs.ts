import { gql } from "apollo-server";

const userTypeDef = gql`
  input LoginCredentials {
    email: String!
    password: String!
  }

  input College {
    id: ID!
    name: String!
  }
  
  input Signup {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    mobileNumber: String!
    college: College!
  }

  type LoginSuccessResponse {
    token: String!
    userType: String!
    lastLogin: String!
  }

  type Status {
    code: Int!
    message: String!
  }

  type ResponseError {
    error: Status!
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