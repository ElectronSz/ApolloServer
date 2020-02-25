import * as PersonApi from '../api/person.api'

export default {
  queries: {
    people: () => PersonApi.findAll()
  },

  mutations: {
    createPerson: async (parent, args) => {
      const person = await PersonApi.create(args)

      return person
    }
  },

  subscriptions: {
    personCreated: {
      subscribe: () => pubsub.asyncIterator('personCreated'),
    },
  },
}