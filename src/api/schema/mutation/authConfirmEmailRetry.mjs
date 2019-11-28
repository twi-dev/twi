import {GraphQLBoolean as TBoolean} from "graphql"

import retry from "api/resolve/mutation/auth/confirmEmailRetry"

const resolve = {
  type: TBoolean,
  required: true,
  handler: retry,
  description: "Executes account confirmation retry."
}

export {resolve}
