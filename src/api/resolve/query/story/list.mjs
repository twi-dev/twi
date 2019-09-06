import bind from "core/helper/graphql/normalizeParams"
import pagination from "core/helper/db/pagination"
import toPage from "core/helper/graphql/toPage"

import Story from "model/Story"
import File from "model/File"
import User from "model/User"

const list = ({args}) => Story.findAndCountAll({
  ...pagination(args),

  where: {isDraft: false, isFinished: true},
  include: [
    {
      model: File,
      as: "cover"
    },
    {
      model: User,
      as: "publisher"
    }
  ],
}).then(toPage(pagination(args)))

export default list |> bind
