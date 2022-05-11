import {resolve} from "path"

import {buildSchemaSync} from "type-graphql"
import {GraphQLSchema} from "graphql"
import {Container} from "typedi"

import {EXTNAME, EXCLUDE_PATTERNS} from "helper/util/readDir"

import authChecker from "auth/checker"

const RESOLVERS_ROOT = resolve(__dirname, "resolver", `*Resolver${EXTNAME}`)

const schema: GraphQLSchema = buildSchemaSync({
  container: Container,
  resolvers: [RESOLVERS_ROOT, ...EXCLUDE_PATTERNS],
  authChecker
})

export default schema
