import bind from "core/graphql/bindResolver"

import User from "database/model/User"

const findUserByLogin = params => User.findOneByLogin(params)

export default bind(findUserByLogin)
