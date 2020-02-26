import gql from 'graphql-tag'

export const createUser = gql`

mutation CreateUser ($fname: String!, $lname: String!, $age: Number) {
            userCreateOne(record: { fname: $fname, lname: $lname, age: $age }) {
              recordId
              record {
                fname
                lname
                age
              }
            }
          }
 
`;