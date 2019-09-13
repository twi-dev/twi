import bind from "core/helper/graphql/normalizeParams"
import Forbidden from "core/error/http/Forbidden"
import NotFound from "core/error/http/NotFound"
import auth from "core/auth/checkUser"
import conn from "core/db/connection"

import Chapter from "model/Chapter"
import Story from "model/Story"

import getCommonAbilities from "acl/common"

const include = [{model: Story, as: "story"}]

const chapterUpdate = ({args, ctx}) => conn.transaction(async transaction => {
  const {user} = ctx.state
  const {id, ...fields} = args.chapter

  const chapter = await Chapter.findByPk(id, {include, transaction})

  if (!chapter) {
    throw new NotFound("Can't find requested chapter.")
  }

  const aclCommon = getCommonAbilities(user)

  // Check abilities for story and chapter
  if (aclCommon.cannot("update", chapter)) {
    throw new Forbidden("You have no access to update this chapter.")
  }

  return chapter.update(fields, {transaction})
    .then(() => chapter.reload({transaction}))
})

export default chapterUpdate |> auth |> bind
