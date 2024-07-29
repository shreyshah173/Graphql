import { gql } from 'apollo-server-express';

const typeDef = gql`
    type Query {
        users: [User]
        quotes: [Quote]
        user(id: ID!): User
        iquote(by: ID!): [Quote]
    }
    
    type User { 
        id: ID!
        firstName: String
        lastName: String
        email: String
        quotes: [Quote]
    }

    type Quote {
       name: String
       by: String 
    }

    type Mutation {
        signupUserDummy(firstName: String!, lastName: String!, email: String!,password:String!): User
    }
`

export default typeDef;