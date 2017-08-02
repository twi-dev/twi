import {createModel, Model} from "core/database"

@createModel
class Story extends Model {
  static get roles() {
    return {
      beta: 0,
      painter: 1
    }
  }

  static async createOne(creator, story) {
    story = await this({...story, creator}).save()

    return await story.toJS()
  }

  static async getManyByAuthor(author) {
    const stories = await this.find().where({author}).exec()

    return await Promise.all(stories.map(s => s.toJS()))
  }
}

export default Story
