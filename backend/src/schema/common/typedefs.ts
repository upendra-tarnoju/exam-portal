import { gql } from "apollo-server";

const commonTypeDefs = gql`
  scalar EmailAddress
  scalar NonNegativeInt

  type Status {
    code: NonNegativeInt!
    message: String!
  }

  type ResponseError {
    error: Status!
  }
`;

export default commonTypeDefs;