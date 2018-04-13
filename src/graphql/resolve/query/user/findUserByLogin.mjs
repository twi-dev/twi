import bind from "core/graphql/bindResolver"

import User from "database/model/User"

const findUserByLogin = params => User.findByLogin(params)

export default bind(findUserByLogin)
