import {GraphQLNonNull as Required} from "graphql"

import update from "server/api/resolve/mutation/user/avatarUpdate"
import TFileInput from "server/api/input/common/TFileInput"
import TFile from "server/api/type/common/TFile"

/** @type {import("graphql").GraphQLFieldConfig} */
const field = {
  type: new Required(TFile),
  description: "Adds/Updates user's avatar",
  resolve: update,
  args: {
    image: {
      type: new Required(TFileInput)
    }
  }
}

export default field
