import { composeWithMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';
// import composeWithRelay from 'graphql-compose-relay'
import User from './models/user'
import Post from './models/post'


const customizationOptions = {};
const UserTC = composeWithMongoose(User, customizationOptions);
const PostTC = composeWithMongoose(Post, customizationOptions);

UserTC.addResolver({
  name: 'findUserByName',
  type: UserTC,
  args: { name: 'String!'},
  resolve: async ({ source, args, context, info }) => {

    const user = await User.findOne({fname: args.name})
  
    return user
  }
})


schemaComposer.Query.addFields({
  getUserById: UserTC.getResolver('findById'),
  getUserByIds: UserTC.getResolver('findByIds'),
  getOneUser: UserTC.getResolver('findOne'),
  getAllUsers: UserTC.getResolver('findMany'),
  countUsers: UserTC.getResolver('count'),
  userConnection: UserTC.getResolver('connection'),
  userPagination: UserTC.getResolver('pagination'),



  getPostById: PostTC.getResolver('findById'),
  getPostByIds: PostTC.getResolver('findByIds'),
  getOnePost: PostTC.getResolver('findOne'),
  getAllPosts: PostTC.getResolver('findMany'),
  countPosts: PostTC.getResolver('count'),
  postConnection: PostTC.getResolver('connection'),
  postPagination: PostTC.getResolver('pagination'),
});


schemaComposer.Mutation.addFields({
  createOneUser: UserTC.getResolver('createOne'),
  createManyUsers: UserTC.getResolver('createMany'),
  updateUserById: UserTC.getResolver('updateById'),
  updateOneUser: UserTC.getResolver('updateOne'),
  updateManyUsers: UserTC.getResolver('updateMany'),
  removeUserById: UserTC.getResolver('removeById'),
  removeOneUser: UserTC.getResolver('removeOne'),
  removeManyUsers: UserTC.getResolver('removeMany'),

  //custom [UserTC] resolvers
  findUserByName: UserTC.getResolver('findUserByName'),


  createOnePost: PostTC.getResolver('createOne'),
  createMnayPosts: PostTC.getResolver('createMany'),
  updatePostById: PostTC.getResolver('updateById'),
  updateOnePost: PostTC.getResolver('updateOne'),
  updateManyPosts: PostTC.getResolver('updateMany'),
  removePostById: PostTC.getResolver('removeById'),
  removeOnePost: PostTC.getResolver('removeOne'),
  removeManyPost: PostTC.getResolver('removeMany'),


});

// UserTC.addRelation('posts', {
//   resolver: () => PostTC.getResolver('connection'),
//   prepareArgs: {
//     filter: source => ({ _id: source.userId }),
//   },
//   projection: { userId: true },
// })

// PostTC.addRelation('user', {
//   resolver: () => UserTC.getResolver('findMany'),
//   prepareArgs: {
//     filter: source => ({
//       _operators: {
//         _id: {
//           in: source.userId || []
//         }
//       }
//     }),
//     skip: null,
//     sort: null,
//   },
//   projection: { userId: true },
// })

const graphqlSchema = schemaComposer.buildSchema();
export default graphqlSchema;