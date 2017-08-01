import Story from "database/model/Story"

import checkUser from "core/helper/decorator/checkUser"

async function addStory(_, {story}, ctx) {
  return await Story.createOne(ctx.state.user.id, story, ctx)
}

export default checkUser(addStory)
