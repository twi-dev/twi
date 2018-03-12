import Story from "database/model/Story"
import checkUser from "core/auth/checkUser"

async function addChapter(_, {storyId, chapter}, ctx) {
  const viewer = ctx.state.user.id

  return await Story.addOneChapter(viewer, storyId, chapter)
}

export default checkUser(addChapter)
