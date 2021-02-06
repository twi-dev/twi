import bind from "server/lib/helper/graphql/normalizeParams"
import Forbidden from "server/lib/error/http/Forbidden"
import NotFound from "server/lib/error/http/NotFound"
import db from "server/lib/db/connection"

import Story from "server/model/Story"
import Chapter from "server/model/Chapter"

import getChapterAbilities from "server/acl/chapter"
import getCommonAbilities from "server/acl/common"

const include = [{model: Story, as: "story", required: true, paranoid: false}]

const chapterRemove = ({args, ctx}) => db.transaction(async transaction => {
  const {user} = ctx.state
  const {chapterId} = args

  const chapter = await Chapter.findByPk(chapterId, {include, transaction})

  if (!chapter) {
    throw new NotFound("Cannot find requested chapter.")
  }

  const aclCommon = getCommonAbilities(user)
  const aclChapter = getChapterAbilities({user})

  if (
    aclCommon.cannot("delete", chapter) || aclChapter.cannot("delete", chapter)
  ) {
    throw new Forbidden("You cannot add a new chapter.")
  }

  return chapter.destroy({transaction}).then(() => chapterId)
})

export default chapterRemove |> bind
