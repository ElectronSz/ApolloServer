import { composeWithMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';
// import composeWithRelay from 'graphql-compose-relay'
import Book from './models/book'
import Author from './models/author'


const customizationOptions = {};
const BookTC = composeWithMongoose(Book, customizationOptions);
const AuthorTC = composeWithMongoose(Author, customizationOptions);




BookTC.addFields({
  authorId: {
    type: AuthorTC,
    resolve: book => Author.findOne({ _id: book.authorId })
  },
})

AuthorTC.addFields({
  books: {
    type: [BookTC],
    resolve: async (authorId) => {
      const user = await Book.find({ authorId: authorId.id })
      
      if (!user) {
        return []
      }
      else {

        return user || []
      }
    }
  },
})

// BookTC.addResolver({
//   name: 'getAllBooks',
//   type: BookTC,
//   resolve: async ({ source, args, context, info }) => {

//     const user = await Book.find()

//     return user
//   }
// })

schemaComposer.Query.addFields({
  getAuthorById: AuthorTC.getResolver('findById'),
  // getUserByIds: UserTC.getResolver('findByIds'),
  // getOneUser: UserTC.getResolver('findOne'),
  getAllAuthors: AuthorTC.getResolver('findMany'),
  // countUsers: UserTC.getResolver('count'),
  // userConnection: UserTC.getResolver('connection'),
  // userPagination: UserTC.getResolver('pagination'),



  getBookById: BookTC.getResolver('findById'),
  // getPostByIds: PostTC.getResolver('findByIds'),
  // getOnePost: PostTC.getResolver('findOne'),
  getAllBooks: BookTC.getResolver('findMany'),
  // countPosts: PostTC.getResolver('count'),
  // postConnection: PostTC.getResolver('connection'),
  // postPagination: PostTC.getResolver('pagination'),
});


schemaComposer.Mutation.addFields({
  createOneAuthor: AuthorTC.getResolver('createOne'),
  // createManyUsers: UserTC.getResolver('createMany'),
  // updateUserById: UserTC.getResolver('updateById'),
  // updateOneUser: UserTC.getResolver('updateOne'),
  // updateManyUsers: UserTC.getResolver('updateMany'),
  // removeUserById: UserTC.getResolver('removeById'),
  // removeOneUser: UserTC.getResolver('removeOne'),
  // removeManyUsers: UserTC.getResolver('removeMany'),

  // //custom [UserTC] resolvers
  // findUserByName: UserTC.getResolver('findUserByName'),


  createOneBook: BookTC.getResolver('createOne'),
  // createMnayPosts: PostTC.getResolver('createMany'),
  // updatePostById: PostTC.getResolver('updateById'),
  // updateOnePost: PostTC.getResolver('updateOne'),
  // updateManyPosts: PostTC.getResolver('updateMany'),
  // removePostById: PostTC.getResolver('removeById'),
  // removeOnePost: PostTC.getResolver('removeOne'),
  // removeManyPost: PostTC.getResolver('removeMany'),


});


const graphqlSchema = schemaComposer.buildSchema();
export default graphqlSchema;