import gql from 'graphql-tag'

export const createPerson = gql`
  mutation CreatePerson($fname: String!, $lname: String!) {
    createPerson(fname: $fname, lname: $lname) {
      id
      fname,
      lname
    }
  }
`;