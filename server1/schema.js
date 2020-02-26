import mongoose from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';

// STEP 1: DEFINE MONGOOSE SCHEMA AND MODEL
// const LanguagesSchema = new mongoose.Schema({
//   language: String,
//   skill: {
//     type: String,
//     enum: [ 'basic', 'fluent', 'native' ],
//   },
// });

const UserSchema = new mongoose.Schema({
  fname: String,
  lname: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    index: true,
  },
  // languages: {
  //   type: Array,
  //   default: [],
  // },
  contacts: { 
    email: String,
    phones: [String],
  },
});

const User = mongoose.model('User', UserSchema);



// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const customizationOptions = {}; // left it empty for simplicity, described below
const UserTC = composeWithMongoose(User, customizationOptions);

// STEP 3: Add needed CRUD User operations to the GraphQL Schema
// via graphql-compose it will be much much easier, with less typing
schemaComposer.Query.addFields({
  userById: UserTC.getResolver('findById'),
  userByIds: UserTC.getResolver('findByIds'),
  userOne: UserTC.getResolver('findOne'),
  userMany: UserTC.getResolver('findMany'),
  userCount: UserTC.getResolver('count'),
  userConnection: UserTC.getResolver('connection'),
  userPagination: UserTC.getResolver('pagination'),
});

schemaComposer.Mutation.addFields({
  userCreateOne: UserTC.getResolver('createOne'),
  userCreateMany: UserTC.getResolver('createMany'),
  userUpdateById: UserTC.getResolver('updateById'),
  userUpdateOne: UserTC.getResolver('updateOne'),
  userUpdateMany: UserTC.getResolver('updateMany'),
  userRemoveById: UserTC.getResolver('removeById'),
  userRemoveOne: UserTC.getResolver('removeOne'),
  userRemoveMany: UserTC.getResolver('removeMany'),
});

const graphqlSchema = schemaComposer.buildSchema();
export default graphqlSchema;