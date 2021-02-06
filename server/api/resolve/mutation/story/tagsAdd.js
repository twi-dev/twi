import {Op as op} from "sequelize"

import db from "server/lib/db/connection"
import NotFound from "server/lib/error/http/NotFound"
import Forbidden from "server/lib/error/http/Forbidden"
import waterfall from "server/lib/helper/array/runWaterfall"
import bind from "server/lib/helper/graphql/normalizeParams"

import getCommonAbilities from "server/acl/common"

import StoryTags from "server/model/StoryTags"
import Story from "server/model/Story"
import Tag from "server/model/Tag"

// NOTE: Work in progress
// TODO: Add categories assigning using prefixes
const tagsAdd = ({args, ctx}) => db.transaction(async transaction => {
  let {id: storyId, tags} = args.story
  const {user} = ctx.state

  const acl = getCommonAbilities(user)

  if (acl.cannot("create", Tag)) {
    throw new Forbidden("You cannot add tags to the story.")
  }

  const story = await Story.findByPk(storyId)

  if (!story) {
    throw new NotFound("There's no such story.")
  }

  const existent = await Tag.findAll({
    where: {slug: {[op.in]: tags}},

    transaction
  })

  tags = await Tag.bulkCreate(
    tags.filter(tag => tag !== existent.slug),

    {
      transaction
    }
  )

  return waterfall([
    () => StoryTags.bulkCreate(
      tags.map(({id: tagId}) => ({storyId, tagId})),

      {
        transaction
      }
    ),

    () => [...tags, ...existent],

    list => list.map(({id}) => id)
  ])
})

export default tagsAdd |> bind
