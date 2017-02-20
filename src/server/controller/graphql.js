import Router from "koa-router"
import {graphqlKoa, graphiqlKoa} from "graphql-server-koa"

const actionGraphiQL = () => graphiqlKoa({endpointURL: "/graphql"})

const actionGraphQL = () => graphqlKoa()

const r = new Router()

r.get("/", actionGraphiQL())

r.all("/", actionGraphQL())

// Ctor for GraphQL routes
function GraphQLController() {}

GraphQLController.prototype.router = r

export default GraphQLController
