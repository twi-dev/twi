import {createModel, Model} from "core/db"

import schema from "./schema"

const isArray = Array.isArray

@createModel(schema)
class Character extends Model {
  static create(character, options) {
    return super.create(character, options)
  }

  static async createMany(characters, options) {
    if (!isArray(characters)) {
      characters = [characters]
    }

    return super.createMany(characters, options)
  }
}

export default Character
