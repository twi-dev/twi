import Story from "database/model/Story"

async function addStory(_, {story}, ctx) {
  return await Story.createOne(ctx.state.user.id, story, ctx)
}

export default addStory
