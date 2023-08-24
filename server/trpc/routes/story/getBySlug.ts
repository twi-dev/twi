import {TRPCError} from "@trpc/server"

import {procedure} from "../../procedures/base.js"

import {Story} from "../../../db/entities.js"

import {StoryOutput} from "../../types/story/StoryOutput.js"
import {StoryWithSlugInput} from "../../types/story/StoryWithSlugInput.js"

export const getBySlug = procedure
  .input(StoryWithSlugInput)
  .output(StoryOutput)
  .query(async ({input: {slug}, ctx: {orm}}) => {
    const story = await orm.em.findOneOrFail(Story, slug, {
      failHandler: () => new TRPCError({code: "NOT_FOUND"})
    })

    return story
  })
