import { GraphQLServer } from "graphql-yoga";
import resolvers from "./graphql/resolvers";

const baseUrl = "appname";

const server  = new GraphQLServer({
    typeDefs: "graphql/schema.graphql",
    resolvers
});

const options = {
    port: 4000,
    endpoint: `/${baseUrl}/graphql`,
    playground: `/${baseUrl}/playground`,
}

server.start(options, ({port}) => console.log("ML GraphQL Server Start"));