import Chapter from "db/model/Chapter"
import Story from "db/model/Story"

import auth from "core/auth/checkUser"
import bind from "core/helper/graphql/bindResolver"

async function addStory({args, ctx}) {
  const {story} = args

  if (story.chapters) {
    story.chapters = await Chapter.createMany(story.chapters)
  }

  return Story.create({...story, userId: ctx.state.user.id})
}

export default addStory |> bind |> auth
