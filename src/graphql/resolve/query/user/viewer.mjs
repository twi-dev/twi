import compose from "lodash/fp/compose"

import auth from "core/auth/checkUser"
import bind from "core/graphql/bindResolver"

import User from "db/model/User"

const viewer = ({ctx}) => User.findById(ctx.state.user.id)

export default compose([bind, auth])(viewer)
