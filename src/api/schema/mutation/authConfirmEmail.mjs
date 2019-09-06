import {GraphQLString as TString, GraphQLBoolean as TBoolean} from "graphql"

import confirm from "api/resolve/mutation/auth/confirmEmail"

const resolve = {
  type: TBoolean,
  required: true,
  handler: confirm,
  descriotion: "Executes account confirmation using given token. "
    + "Returns  \"true\" when the operation has been finished successfully "
    + "and \"false\" for otherwise"
}

const args = {
  hash: [TString, true]
}

export {resolve, args}
