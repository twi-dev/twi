import {GraphQLNonNull as Required} from "graphql"

import update from "api/resolve/mutation/user/contactsUpdate"
import TViewer from "api/type/user/TViewer"

/** @type {import("graphql").GraphQLFieldConfig} */
const field = {
  type: new Required(TViewer),
  description: "Updates user's contact information",
  resolve: update
}

export default field
