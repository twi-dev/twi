import bind from "core/helper/graphql/normalizeParams"
import auth from "core/auth/checkUser"

import User from "model/User"

const getViewer = ({ctx}) => User.findByPk(ctx.state.user.id)

export default getViewer |> auth |> bind
