import bind from "core/helper/graphql/bindResolver"

import User from "db/model/User"

const list = ({args}) => (
  User.find({}, args.page)
    .where({status: {$ne: User.statuses.unactivated}})
)

export default bind(list)
