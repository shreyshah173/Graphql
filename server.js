import { ApolloServer,gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const typeDef = gql`
    type Query {
        hello: String
    }
`

const resolvers = {
    Query: {
        hello: () => "Hello World"
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