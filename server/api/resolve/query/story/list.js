import getPageInfo from "server/lib/helper/graphql/getPageInfo"
import bind from "server/lib/helper/graphql/normalizeParams"
import toPage from "server/lib/helper/graphql/toPage"

import Story from "server/model/Story"
import File from "server/model/File"
import User from "server/model/User"

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
  const pageInfo = getPageInfo(args)

  return Story.findAndCountAll({...pageInfo, where, include})
    .then(toPage(pageInfo))
}

export default getStories |> bind
