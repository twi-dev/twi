import {GraphQLNonNull as Required} from "graphql"

import TSession from "server/api/type/auth/TAuthSession"

import sessions from "server/api/resolve/query/auth/sessions"

/** @type {import("graphql").GraphQLFieldConfig} */
const field = {
  type: new Required(TSession),
  resolve: sessions
}

export default field
