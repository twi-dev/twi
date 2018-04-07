import compose from "lodash/fp/compose"

import checkUser from "core/auth/checkUser"
import bind from "core/graphql/bindResolver"

import User from "database/model/User"

const findViewer = ({ctx: {state}}) => User.findOneById(state.user.id)

export default compose([bind, checkUser])(findViewer)
