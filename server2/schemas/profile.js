import { gql } from 'apollo-server';

export default gql`
  type Profile {
    id: ID!
    fname: String!
    lname: String!
    user: User!
  }

  extend type Query {
    profile(id: ID!): Profile!
    profiles: [Profile!]!
  }

  extend type Mutation {
    createProfile(fname: String!, lname: String!): Profile!
  }
`;
