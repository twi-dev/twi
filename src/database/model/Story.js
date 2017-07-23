import {createModel, Model} from "core/database"

@createModel
class Story extends Model {
  static async createOne(owner, story) {
    const Model = this

    const model = new Model({...story})

    await model.validate()

    return await model.save()
  }
}

export default Story
