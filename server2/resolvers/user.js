import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

export default {
  Query: {

    //get user
    user: async (parent, { id }, { models: { userModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const user = await userModel.findById({ _id: id }).exec();
      return user;
    },

    //sign in user
    login: async (parent, { email, password }, { models: { userModel } }, info) => {
      const user = await userModel.findOne({ email }).exec();

      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      const matchPasswords = bcrypt.compareSync(password, user.password);

      if (!matchPasswords) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = jwt.sign({ id: user.id }, 'riddlemethis', { expiresIn: 24 * 10 * 50 });

      return {
        token,
      };
    },
  },

  //mutations
  Mutation: {

    //create new user
    createUser: async (parent, { email, password }, { models: { userModel } }, info) => {
      const user = await userModel.create({ email, password });
      return user;
    },
  },

//posts for user
  User: {
    posts: async ({ id }, args, { models: { postModel } }, info) => {
        console.log(id);
        
      const posts = await postModel.find({ author: id }).exec();
      return posts;
    },
  },
};
