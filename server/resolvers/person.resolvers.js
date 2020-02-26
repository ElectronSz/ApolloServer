import * as PersonApi from '../api/person.api'
import pubsub from '../pubsub'

export default {
  queries: {
    people: () => PersonApi.findAll()
  },

  mutations: {
    createPerson: async (parent, args) => {
      const person = await PersonApi.create(args)

      return person
    },
    getPersonById: async (parent, id) =>{
      const person = await PersonApi.findById(id)

      return person
    },

    deletePerson: async (parent, id) =>{
      const { deletedCount } = await PersonApi.deleteOne(id)

      return deletedCount
    }
  },

  subscriptions: {
    personCreated: {
      subscribe: () => pubsub.asyncIterator('personCreated'),
    },
  },
}