import Story from "database/model/Story"
import checkUser from "core/helper/decorator/checkUser"

const addChapter = (_, {storyId, chapter}, state) => (
  Story.addOneChapter(state.user.id, storyId, chapter)
)

export default checkUser(addChapter)
