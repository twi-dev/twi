import {permittedFieldsOf} from "@casl/ability/extra"

import pick from "lodash/pick"
import isEmpty from "lodash/isEmpty"

import bind from "core/helper/graphql/normalizeParams"
import auth from "core/auth/checkUser"
import conn from "core/db/connection"

import NotFound from "core/error/http/NotFound"
import Forbidden from "core/error/http/Forbidden"

import getCommonAbilities from "acl/common"
import getStoryAbilities from "acl/story"

import Story from "model/Story"

const update = ({args, ctx}) => conn.transaction(async transaction => {
  const {user} = ctx.state
  let {id, ...fields} = args.story

  const story = await Story.findByPk(id, {transaction})

  if (!story) {
    throw new NotFound("Can't find requested story.")
  }

  const aclStory = getStoryAbilities({user})
  const aclCommon = getCommonAbilities(user)

  if (aclStory.cannot("update", story) && aclCommon.cannot("update", story)) {
    throw new Forbidden("You can't update the story.")
  }

  const filter = permittedFieldsOf(aclStory, "update", story)

  if (!isEmpty(filter)) {
    fields = pick(fields, filter)
  }

  return story.update(fields, {transaction})
    .then(() => story.reload({transaction}))
})

export default update |> auth |> bind
