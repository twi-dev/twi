import bind from "core/helper/graphql/normalizeParams"
import auth from "core/auth/checkUser"

import User from "model/User"

const viewer = ({ctx}) => User.findByPk(ctx.state.user.id)

export default viewer |> bind |> auth
