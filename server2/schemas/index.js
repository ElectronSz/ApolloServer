import userSchema from './user';
import postSchema from './post';
import profileSchema from './profile'

import { gql } from 'apollo-server';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, postSchema, profileSchema];

