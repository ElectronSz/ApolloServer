<template>
  <div class="container">
    <div v-if="people && people.length >0" class="row">
      <div v-for="person in people" :key="person.id" class="col-md-3 mt-4">
        <div class="card">
          <div class="card-content">
            <p class="subtitle">{{person.fname}} {{person.lname}}</p>
          </div>
        </div>
      </div>
    </div>

    <article v-else class="message is-warning col-md-12">
      <div class="message-header">
        <p>No People Warning!</p>
        <button class="delete" aria-label="delete"></button>
      </div>
      <div class="message-body">There are no people in the database</div>
    </article>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <input class="form-control" v-model="person.fname" placeholder="First Name" />
        </div>

        <div class="form-group">
          <input class="form-control" v-model="person.lname" placeholder="Last Name" />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" @click="handleCreatePerson">Create Person</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PEOPLE } from "@/gql/person.queries";
import { PERSON_CREATED } from "@/gql/subscriptions/person.subscriptions";
import { createPerson } from "@/gql/mutations/person.mutations";
export default {
  apollo: {
    people: {
      query: PEOPLE,
      subscribeToMore: {
        document: PERSON_CREATED,
        updateQuery: (previousResult, { subscriptionData }) => {
          return {
            people: [
              ...previousResult.people,
              subscriptionData.data.personCreated
            ]
          };
        }
      }
    }
  },
  methods: {
    handleCreatePerson() {
      this.$apollo.mutate({
        mutation: createPerson,
        variables: {
          fname: this.person.fname,
          lname: this.person.lname
        }
      })
    }
  },
  data: () => ({
    person: {
      fname: '',
      lname: ''
    }
  })
};
</script>

