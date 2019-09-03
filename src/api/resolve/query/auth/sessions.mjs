import bind from "core/helper/graphql/normalizeParams"
import auth from "core/auth/checkUser"

import Session from "model/Session"

/**
 * Returns a list of session associated with the current user
 */
const sessions = ({ctx}) => (
  Session.findAll({where: {userId: ctx.state.user.id}})
)

export default sessions |> bind |> auth
