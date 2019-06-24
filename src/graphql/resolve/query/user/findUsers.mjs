import bind from "core/graphql/bindResolver"

import User from "db/model/User"

const findUsers = ({args}) => (
  User.find({}, args.page)
    .where({status: {$ne: User.statuses.unactivated}})
)

export default bind(findUsers)
