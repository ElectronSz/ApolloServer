import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import './db/index'

import schemas from './schemas';
import resolvers from './resolvers';

import userModel from './models/user';
import postModel from './models/post';

const app = express();
app.use(cors());

const getUser = async (req) => {
  const token = req.headers['token'];

  if (token) {
    try {
      return await jwt.verify(token, 'riddlemethis');
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  }
};

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context: async ({ req }) => {
    if (req) {
      const me = await getUser(req);

      return {
        me,
        models: {
          userModel,
          postModel,
        },
      };
    }
  },
  cors: true,
  playground: process.env.NODE_ENV === 'development' ? true : false,
  introspection: true,
  tracing: true,
  path: '/',
});

server.applyMiddleware({
    app,
    path: '/',
    cors: true,
    onHealthCheck: () =>
        new Promise((resolve, reject) => {
            if (mongoose.connection.readyState > 0) {
                resolve();
            } else {
                reject();
            }
        }),
});


app.listen({ port: process.env.SERVER_PORT }, () => {
  console.log(`🚀 Server listening on port ${process.env.SERVER_PORT}`);
  console.log(`😷 Health checks available at ${process.env.HEALTH_ENDPOINT}`);
});
