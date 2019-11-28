import bind from "lib/helper/graphql/normalizeParams"
import auth from "lib/auth/checkUser"

import User from "model/User"

const getViewer = ({ctx}) => User.findByPk(ctx.state.user.id)

export default getViewer |> auth |> bind
