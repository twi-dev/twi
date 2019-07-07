import bind from "core/helper/graphql/bindResolver"
import select from "core/helper/graphql/select"
import auth from "core/auth/checkUser"

import Session from "db/model/Session"

/**
 * Returns a list of session associated with the current user
 */
const sessions = ({ctx, node}) => (
  Session.findOne({userId: ctx.state.user.id}) |> select(node)
)

export default sessions |> bind |> auth
