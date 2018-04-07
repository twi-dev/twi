import bind from "core/graphql/bindResolver"

import User from "database/model/User"

const findUsers = params => User.findMany(params)

export default bind(findUsers)
