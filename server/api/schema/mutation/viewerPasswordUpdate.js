import {GraphQLNonNull as Required} from "graphql"

import TPasswordUpdate from "server/api/input/user/TUserPasswordUpdateInput"
import update from "server/api/resolve/mutation/user/passwordUpdate"
import TViewer from "server/api/type/user/TViewer"

/** @type {import("graphql").GraphQLFieldConfig} */
const field = {
  type: new Required(TViewer),
  resolve: update,
  description: "Updates user's password. This operation requires user "
    + "to prove their old password first.",
  args: {
    password: {
      type: new Required(TPasswordUpdate)
    }
  }
}

export default field
