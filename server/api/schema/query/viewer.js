import {GraphQLNonNull as Required} from "graphql"

import TViewer from "server/api/type/user/TViewer"

import viewer from "server/api/resolve/query/user/viewer"

/** @type {import("graphql").GraphQLFieldConfig} */
const field = {
  type: new Required(TViewer),
  description: "Returns the current user's information.",
  resolve: viewer,
}

export default field
