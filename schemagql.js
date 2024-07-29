import { gql } from 'apollo-server-express';


const typeDef = gql`
    type Query {
        users: [User]
        quotes: [Quote]
        user(_id: ID!): User
        iquote(by: ID!): [Quote]
    }
    
    type User { 
        _id: ID!
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
        signupUser(input: UserInput): User
    }

    input UserInput {
        firstName: String
        lastName: String
        email: String
        password: String
    }
`;

export default typeDef;
