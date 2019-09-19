import bind from "core/helper/graphql/normalizeParams"
import pagination from "core/helper/db/pagination"
import toPage from "core/helper/graphql/toPage"

import Story from "model/Story"
import File from "model/File"
import User from "model/User"

const where = {isDraft: false, isFinished: true}

const include = [
  {
    model: File,
    as: "cover"
  },
  {
    model: User,
    as: "publisher"
  }
]

function getStories({args}) {
  const pageInfo = pagination(args)

  return Story.findAndCountAll({...pageInfo, where, include})
    .then(toPage(pageInfo))
}

export default getStories |> bind
