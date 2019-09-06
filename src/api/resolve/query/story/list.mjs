import bind from "core/helper/graphql/normalizeParams"
import pagination from "core/helper/db/pagination"
import toPage from "core/helper/graphql/toPage"

import Story from "model/Story"

const list = ({args}) => Story.findAndCountAll({
  ...pagination(args),

  where: {isDraft: false, isFinished: true},
}).then(toPage(pagination(args)))

export default list |> bind
