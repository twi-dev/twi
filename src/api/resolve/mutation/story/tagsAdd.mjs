import {Op as op} from "sequelize"

import groupBy from "lodash/groupBy"

import conn from "lib/db/connection"
import auth from "lib/auth/checkUser"
import NotFound from "lib/error/http/NotFound"
import Forbidden from "lib/error/http/Forbidden"
import waterfall from "lib/helper/array/runWaterfall"
import bind from "lib/helper/graphql/normalizeParams"

import getCommonAbilities from "acl/common"

import StoryTags from "model/StoryTags"
import Story from "model/Story"
import Tag from "model/Tag"

// NOTE: Work in progress
// TODO: Add categories assigning using prefixes
const tagsAdd = ({args, ctx}) => conn.transaction(async transaction => {
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

    list => groupBy(list, "categoryId"),

    list => list.map(({id}) => id)
  ])
})

export default tagsAdd |> auth |> bind
