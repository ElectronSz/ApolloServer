import { gql } from 'apollo-server';

export default gql`
  type User {
    id: ID!
    email: String!
    posts: [Post!]!
  }

  type Token {
    token: String!
  }

  extend type Query {
    user(id: ID!): User!
    login(email: String!, password: String!): Token!
  }

  extend type Mutation {
    createUser(email: String!, password: String!): User!
  }
`;
