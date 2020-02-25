import personResolvers from './person.resolvers'

export default {
  Query: {
    ...personResolvers.queries
  },

  Mutation: {
    ...personResolvers.mutations
  },

  Subscription: {
    ...personResolvers.subscriptions
  },
}