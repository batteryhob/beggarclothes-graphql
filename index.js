import { GraphQLServer } from "graphql-yoga";
import resolvers from "./graphql/resolvers";


const server  = new GraphQLServer({
    typeDefs: "graphql/schema.graphql",
    resolvers
});

const options = {
    port: 4000,
    endpoint: `/graphql`,
    playground: `/playground`,
}

server.start(options, ({port}) => console.log("ML GraphQL Server Start"));