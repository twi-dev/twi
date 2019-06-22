import partial from "lodash/partial"
import nanoid from "nanoid"

import {createModel, Model} from "core/db"

import schema from "./schema"

const isArray = Array.isArray

// Set code length to 4
const generateCode = partial(nanoid, 4)

@createModel(schema)
class Character extends Model {
  static create(character, options) {
    character.code = generateCode()

    return super.create(character, options)
  }

  static async createMany(characters, options) {
    if (!isArray(characters)) {
      characters = [characters]
    }

    for (const [idx, character] of characters.entries()) {
      const code = generateCode()

      characters[idx] = {...character, code}
    }

    return super.createMany(characters, options)
  }
}

export default Character
