import bind from "core/helper/graphql/bindResolver"
import select from "core/helper/graphql/select"

import User from "db/model/User"

const list = ({args, node}) => (
  User.find({}, args.page).where({status: {$ne: User.statuses.unactivated}})
    |> select(node)
)

export default bind(list)
