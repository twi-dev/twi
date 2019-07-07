import bind from "core/helper/graphql/bindResolver"
import auth from "core/auth/checkUser"

import User from "db/model/User"

const viewer = ({ctx}) => User.findById(ctx.state.user.id)

export default viewer |> bind |> auth
