import {GraphQLString as TString, GraphQLBoolean as TBoolean} from "graphql"

import confirm from "api/resolve/mutation/auth/confirmEmail"

const resolve = {
  type: TBoolean,
  required: true,
  handler: confirm,
  descriotion: "Executes account confirmation using given token. "
    + "User's client will receive a new session and any existent session, "
    + "associated with him will be destroyed. "
    + "If the operation failed, BadRequest exception will be thrown."
}

const args = {
  hash: [TString, true]
}

export {resolve, args}
