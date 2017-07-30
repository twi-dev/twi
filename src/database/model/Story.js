import {createModel, Model} from "core/database"

@createModel
class Story extends Model {
  static async createOne(creator, story) {
    story = await this({...story, creator}).save()

    return await story.toJS()
  }
}

export default Story
