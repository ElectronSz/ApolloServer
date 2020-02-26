import gql from 'graphql-tag'

export const PERSON_CREATED = gql`
  subscription PersonCreated {
    personCreated {
      id
      fname
      lname
    }
  }
  `