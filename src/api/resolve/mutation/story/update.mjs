import {permittedFieldsOf} from "@casl/ability/extra"

import pick from "lodash/pick"
import omit from "lodash/omit"
import isEmpty from "lodash/isEmpty"

import bind from "core/helper/graphql/bindResolver"
import select from "core/helper/graphql/select"
import auth from "core/auth/checkUser"

import NotFound from "core/error/http/NotFound"
import Forbidden from "core/error/http/Forbidden"

import getCommonAbilities from "acl/common"
import getStoryAbilities from "acl/story"

import Story from "db/model/Story"

async function update({args, ctx, node}) {
  const {id} = args.story

  let fields = omit(args.story, "id")

  const aclStory = getStoryAbilities(ctx.state.user)
  const aclCommon = getCommonAbilities(ctx.state.user)

  const story = await Story.findById(id)

  if (!story) {
    throw new NotFound("Can't find requested story.")
  }

  if (aclStory.cannot("update", story) || aclCommon.cannot("manage", story)) {
    throw new Forbidden("You can't update the story.")
  }

  const filter = permittedFieldsOf(aclStory, "update", story)

  if (!isEmpty(filter)) {
    fields = pick(fields, filter)
  }

  return story.update({$set: fields})
    .then(() => Story.findById(id) |> select(node))
}

export default update |> auth |> bind
