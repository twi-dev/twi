import {GraphQLNonNull as Required} from "graphql"

import TUserPasswordUpdateInput from "api/input/user/TUserPasswordUpdateInput"
import update from "api/resolve/mutation/user/passwordUpdate"
import TViewer from "api/type/user/TViewer"

/** @type {import("graphql").GraphQLFieldConfig} */
const field = {
  type: new Required(TViewer),
  resolve: update,
  description: "Updates user's password. This operation requires user "
    + "to prove their old password first.",
  args: {
    password: {
      type: new Required(TUserPasswordUpdateInput)
    }
  }
}

export default field
