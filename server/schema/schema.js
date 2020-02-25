import { schemaComposer } from 'graphql-compose';

const AuthorTC = schemaComposer.createObjectTC({
  name: 'Author',
  fields: {
    id: 'Int!',
    firstName: 'String',
    lastName: 'String',
  },
});

const PostTC = schemaComposer.createObjectTC({
  name: 'Post',
  fields: {
    id: 'Int!',
    title: 'String',
    votes: 'Int',
    authorId: 'Int',
  },
});

PostTC.addFields({
    author: {
      // you may provide type name as string 'Author',
      // but for better developer experience use Type instance `AuthorTC`
      // it allows to jump to type declaration via Ctrl+Click in your IDE
      type: AuthorTC,
      // resolve method as first argument will receive data for some Post
      // from this data you should somehow fetch Author's data
      // let's take lodash `find` method, for searching by `authorId`
      // PS. `resolve` method may be async for fetching data from DB
      // resolve: async (source, args, context, info) => { return DB.find(); }
      resolve: post => find(authors, { id: post.authorId }),
    },
  });
  
  AuthorTC.addFields({
    posts: {
      // Array of posts may be described as string in SDL in such way '[Post]'
      // But graphql-compose allow to use Type instance wrapped in array
      type: [PostTC],
      // for obtaining list of post we get current author.id
      // and scan and filter all Posts with desired authorId
      resolve: author => filter(posts, { authorId: author.id }),
    },
    postCount: {
      type: 'Int',
      description: 'Number of Posts written by Author',
      resolve: author => filter(posts, { authorId: author.id }).length,
    },
  });

  schemaComposer.Query.addFields({
    posts: {
      type: '[Post]',
      resolve: () => posts,
    },
    author: {
      type: 'Author',
      args: { id: 'Int!' },
      resolve: (_, { id }) => find(authors, { id }),
    },
  });
  
  // Requests which modify data put into Mutation
  schemaComposer.Mutation.addFields({
    upvotePost: {
      type: 'Post',
      args: {
        postId: 'Int!',
      },
      resolve: (_, { postId }) => {
        const post = find(posts, { id: postId });
        if (!post) {
          throw new Error(`Couldn't find post with id ${postId}`);
        }
        post.votes += 1;
        return post;
      },
    },
  });
  
  // After Root type definition, you are ready to build Schema
  // which should be passed to `express-graphql` or `apollo-server`
  export const schema = schemaComposer.buildSchema();