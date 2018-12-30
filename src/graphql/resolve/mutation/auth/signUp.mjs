import waterfall from "core/helper/array/runWaterfall"
import bind from "core/graphql/bindResolver"

import User from "database/model/User"
import Session from "database/model/Session"

/**
 * Assign created user as an argument
 */
const assign = params => user => ({...params, args: {user}})

const authSignUp = params => (
  waterfall([User.createOne, assign(params), Session.sign], params)
)

export default authSignUp |> bind
