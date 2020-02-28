import { AuthenticationError } from 'apollo-server';

export default {
    Query: {

        profile: async (parent, { id }, { models: { profileModel }, me }, info) => {
            if (!me) {
              throw new AuthenticationError('You are not authenticated');
            }
            const profile = await profileModel.findById({ _id: id }).exec();
            return profile;
          },
          profiles: async (parent, args, { models: { profileModel }, me }, info) => {
            if (!me) {
              throw new AuthenticationError('You are not authenticated');
            }
            const profiles = await profileModel.find({ user: me.id }).exec();
            return profiles;
          },
    },
    Mutation: {

        //create profile 👍
        createProfile: async (parent, { fname, lname }, { models: { profileModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated');
            }

            const profile = await profileModel.create({ fname, lname, user: me.id });

            return profile || []


        },
    },
    Profile: {
        user: async ({ user }, args, { models: { userModel } }, info) => {
          const profile = await userModel.findById({ _id: user }).exec();
          return profile;
        },
      },
};
