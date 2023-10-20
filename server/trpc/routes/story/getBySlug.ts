import {TRPCError} from "@trpc/server"
import {wrap} from "@decs/typeschema"

import {procedure} from "../../procedures/base.js"

import {Story} from "../../../db/entities.js"

import {StoryOutput} from "../../valibot/story/StoryOutput.js"
import {StoryGetBySlugInput} from "../../valibot/story/StoryGetBySlugInput.js"

export const getBySlug = procedure
  .input(wrap(StoryGetBySlugInput))
  .output(wrap(StoryOutput))
  .query(async ({input: {slug}, ctx: {orm}}) => {
    const story = await orm.em.findOneOrFail(Story, {slug}, {
      failHandler: () => new TRPCError({code: "NOT_FOUND"}),

      populate: ["description"]
    })

    return story
  })
