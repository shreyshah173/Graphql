import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { quotes, users } from './fakedb.js';

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
`

const resolvers = {
    Query: {
        users: () => users,
        // user: (_,args)=> users.find(user => user.id === args.id),
        user: (_,{id})=> users.find(user => user.id === id),
        quotes: () => quotes,
        iquote: (_,{by})=> quotes.filter(quote => quote.by === by)
    },
    User:{
        quotes: (parent) => quotes.filter(quote => quote.by === parent.id)
    }
}

const server = new ApolloServer({
    typeDefs: typeDef,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
