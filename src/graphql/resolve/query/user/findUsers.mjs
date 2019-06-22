import bind from "core/graphql/bindResolver"

import User from "db/model/User"

const findUsers = ({args}) => User.find({}, args.page)

export default bind(findUsers)
