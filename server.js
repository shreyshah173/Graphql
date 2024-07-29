import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import resolvers from "./resolvers.js";
import typeDef from "./schemagql.js";
import dotenv from 'dotenv';
import mongoose, { mongo } from "mongoose";

dotenv.config();

const url = process.env.mongourl;

mongoose.connect(url);

mongoose.connection.on('open', () => {
    console.log('Connected to database');
});

mongoose.connection.on('error', (error) => {
    console.log('Error connecting to database', error);
});

const server = new ApolloServer({
    typeDefs: typeDef,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
