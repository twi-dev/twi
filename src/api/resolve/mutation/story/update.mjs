import {permittedFieldsOf} from "@casl/ability/extra"

import pick from "lodash/pick"
import omit from "lodash/omit"
import isEmpty from "lodash/isEmpty"

import bind from "core/helper/graphql/normalizeParams"
import auth from "core/auth/checkUser"

import NotFound from "core/error/http/NotFound"
import Forbidden from "core/error/http/Forbidden"

import getCommonAbilities from "acl/common"
import getStoryAbilities from "acl/story"

import Story from "model/Story"

async function update({args, ctx}) {
  const {id} = args.story
  const {user} = ctx.state

  let fields = omit(args.story, "id")

  const story = await Story.findByPk(id)

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

  return story.update(fields).then(() => story.reload())
}

export default update |> auth |> bind
