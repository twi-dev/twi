import {wrap} from "@decs/typeschema"

import {StoryCreateInput} from "../../valibot/story/StoryCreateInput.js"
import {withAuthContext} from "../../middlewares/withAuthContext.js"
import {StoryOutput} from "../../valibot/story/StoryOutput.js"
import {procedure} from "../../procedures/base.js"
import {Story} from "../../../db/entities.js"

export const create = procedure
  .use(withAuthContext)
  .input(wrap(StoryCreateInput))
  .output(wrap(StoryOutput))
  .mutation(async ({input, ctx: {orm, auth}}) => {
    const story = orm.em.create(Story, {...input, publisher: auth.user})

    await orm.em.persistAndFlush(story)

    return story
  })
