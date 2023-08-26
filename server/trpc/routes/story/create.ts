import {StoryCreateInput} from "../../types/story/StoryCreateInput.js"
import {withAuthContext} from "../../middlewares/withAuthContext.js"
import {StoryOutput} from "../../types/story/StoryOutput.js"
import {procedure} from "../../procedures/base.js"
import {Story} from "../../../db/entities.js"

export const create = procedure
  .use(withAuthContext)
  .input(StoryCreateInput)
  .output(StoryOutput)
  .mutation(async ({input, ctx: {orm, auth}}) => {
    const story = orm.em.create(Story, {...input, publisher: auth.user})

    await orm.em.persistAndFlush(story)

    return story
  })
