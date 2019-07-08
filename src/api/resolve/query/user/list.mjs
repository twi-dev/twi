import pagination from "core/helper/graphql/pagination"
import bind from "core/helper/graphql/bindResolver"
import select from "core/helper/graphql/select"

import User from "db/model/User"

const list = ({args, node}) => (
  User.find().where({status: {$ne: User.statuses.unactivated}})
    |> select(node)
    |> pagination(args.cursor, args.limit)
)

export default bind(list)
