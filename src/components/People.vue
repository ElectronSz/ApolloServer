<template>
  <div class="container">
    <div v-if="userMany && userMany.length >0" class="row">
      <div class="col-md-6">
        <div class="form-group">
          <input class="form-control" v-model="user.fname" placeholder="First Name" />
        </div>

        <div class="form-group">
          <input class="form-control" v-model="user.lname" placeholder="Last Name" />
        </div>

        <div class="form-group">
          <input class="form-control" v-model="user.age" placeholder="Last Name" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" @click="handleCreatePerson">Create Person</button>
        </div>
      </div>

      <div class="col-md-6">
        <div class="row">
          <div v-for="user in userMany" :key="user._id" class="col-md-6 mt-2">
            <div class="card">
              <div class="card-content">
                <p class="subtitle">{{user.fname}} {{user.lname}}</p>
              </div>
            </div>
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

    <div class="row mt-4"></div>
  </div>
</template>

<script>
import { USERS } from "@/gql/user.queries";

// import { PERSON_CREATED } from "@/gql/subscriptions/person.subscriptions";
//import { createPerson } from "@/gql/mutations/person.mutations";
import { createUser } from "@/gql/mutations/user.mutations";
//import { gql } from "graphql-tag";

export default {
  apollo: {
    userMany: {
      query: USERS
      // subscribeToMore: {
      //   document: PERSON_CREATED,
      //   updateQuery: (previousResult, { subscriptionData }) => {
      //     return {
      //       people: [
      //         ...previousResult.people,
      //         subscriptionData.data.personCreated
      //       ]
      //     };
      //   }
      // }
    }
  },
  methods: {
    handleCreatePerson() {
      this.$apollo.mutate({
        mutation: createUser,
        variables: {
          fname: this.user.fname,
          lname: this.user.lname,
          age: this.user.age
        }
      });
    }
  },
  data: () => ({
    user: {
      fname: "",
      lname: "",
      age: 0
    }
  })
};
</script>

