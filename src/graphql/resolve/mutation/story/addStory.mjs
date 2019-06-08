import Story from "db/model/Story"

import checkUser from "core/auth/checkUser"

async function addStory(_, {story}, ctx) {
  const viewer = ctx.state.user.id

  return Story.createOne(viewer, story, ctx)
}

export default checkUser(addStory)
