import {wrap} from "@typeschema/valibot"

import {procedure} from "../../procedures/base.js"
import {Story} from "../../../db/entities.js"

import {StoryPageInput} from "../../types/story/StoryPageInput.js"
import {StoryPageOutput} from "../../types/story/StoryPageOutput.js"

export const list = procedure
  .input(wrap(StoryPageInput))
  .output(wrap(StoryPageOutput))
  .query(async ({input: {args}, ctx: {orm}}) => {
    const [items, count] = await orm.em.findAndCount(Story, {}, {
      limit: args.limit,
      offset: args.offset,
      orderBy: {
        createdAt: "desc"
      }
    })

    return {items, count, args}
  })
