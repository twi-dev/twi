import compose from "lodash/fp/compose"

import checkUser from "core/auth/checkUser"
import bind from "core/graphql/bindResolver"

import User from "db/model/User"

const findViewer = params => User.findViewer(params)

export default compose([bind, checkUser])(findViewer)
