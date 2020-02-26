import gql from 'graphql-tag'

export const USERS = gql`
  query {
  userMany(limit: 10){
    _id
    fname
    lname
    age
    languages{
      language
      skill
    }
    contacts{
      email
      phones
    }
  
    
  }
}
`