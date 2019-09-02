import bind from "core/helper/graphql/normalizeParams"
import select from "core/helper/graphql/select"
import auth from "core/auth/checkUser"

import User from "model/User"

const viewer = ({ctx, node}) => User.findById(ctx.state.user.id) |> select(node)

export default viewer |> bind |> auth
