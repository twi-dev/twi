import {GraphQLNonNull as Required} from "graphql"

import TSession from "api/type/auth/TAuthSession"

import sessions from "api/resolve/query/auth/sessions"

/** @type {import("graphql").GraphQLFieldConfig} */
const field = {
  type: new Required(TSession),
  resolve: sessions
}

export default field
