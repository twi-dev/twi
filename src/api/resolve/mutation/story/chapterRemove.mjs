import bind from "lib/helper/graphql/normalizeParams"
import Forbidden from "lib/error/http/Forbidden"
import NotFound from "lib/error/http/NotFound"
import auth from "lib/auth/checkUser"
import db from "lib/db/connection"

import Story from "model/Story"
import Chapter from "model/Chapter"
import Collaborator from "model/Collaborator"

import getChapterAbilities from "acl/chapter"
import getCommonAbilities from "acl/common"

const include = [{model: Story, as: "story", required: true, paranoid: false}]

const chapterRemove = ({args, ctx}) => db.transaction(async transaction => {
  const {user} = ctx.state
  const {chapterId} = args

  const chapter = await Chapter.findByPk(chapterId, {include, transaction})

  if (!chapter) {
    throw new NotFound("Cannot find requested chapter.")
  }

  const collaborator = await Collaborator.findOne({
    where: {userId: user.id, storyId: chapter.story.id}
  })

  const aclCommon = getCommonAbilities(user)
  const aclChapter = getChapterAbilities({user, collaborator})

  if (
    aclCommon.cannot("delete", chapter) || aclChapter.cannot("delete", chapter)
  ) {
    throw new Forbidden("You cannot add a new chapter.")
  }

  return chapter.destroy({transaction}).then(() => chapterId)
})

export default chapterRemove |> auth |> bind
