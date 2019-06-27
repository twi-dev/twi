import bind from "core/graphql/bindResolver"
import auth from "core/auth/checkUser"

import Session from "db/model/Session"

/**
 * Returns a list of session associated with the current user
 */
const sessinos = ({ctx}) => Session.findOne({userId: ctx.state.user.id})

export default sessinos |> bind |> auth
