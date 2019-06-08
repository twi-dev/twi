import {GraphQLString as TString, GraphQLBoolean as TBoolean} from "graphql"

import confirm from "graphql/resolve/mutation/auth/confirmEmail"

const resolve = {
  type: TBoolean,
  required: true,
  handler: confirm
}

const args = {
  hash: [TString, true]
}

export {resolve, args}
