import {permittedFieldsOf} from "@casl/ability/extra"

import pick from "lodash/pick"
import isEmpty from "lodash/isEmpty"

import bind from "server/lib/helper/graphql/normalizeParams"
import Forbidden from "server/lib/error/http/Forbidden"
import NotFound from "server/lib/error/http/NotFound"
import db from "server/lib/db/connection"

import Story from "server/model/Story"
import Chapter from "server/model/Chapter"

import getChapterAbilities from "server/acl/chapter"
import getCommonAbilities from "server/acl/common"

const include = [{model: Story, as: "story", required: true}]

const chapterUpdate = ({args, ctx}) => db.transaction(async transaction => {
  const {user} = ctx.state
  let {id, ...fields} = args.chapter

  const chapter = await Chapter.findByPk(id, {include, transaction})

  if (!chapter) {
    throw new NotFound("Can't find requested chapter.")
  }

  const aclCommon = getCommonAbilities(user)
  const aclChapter = getChapterAbilities({user})

  if (
    aclCommon.cannot("update", chapter) || aclChapter.cannot("update", chapter)
  ) {
    throw new Forbidden("You have no access to update this chapter.")
  }

  const filter = permittedFieldsOf(aclChapter, "update", chapter)

  if (!isEmpty(filter)) {
    fields = pick(fields, filter)
  }

  return chapter.update(fields, {transaction})
    .then(() => chapter.reload({transaction}))
})

export default chapterUpdate |> bind
