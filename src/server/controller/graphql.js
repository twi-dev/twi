import {graphqlKoa, graphiqlKoa} from "graphql-server-koa"

import {route, methods} from "server/core/helper/decorator/controller"

const {get, all} = methods

class GraphQLController {
  @route("/", all)
  async actionGraphQL(ctx) {
    ctx.body = "GraphQL endpoint. Not implemented"
  }
}

export default GraphQLController
