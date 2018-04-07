import {createModel, Model} from "core/database"

import nanoid from "core/helper/util/nanoid"
import fromFields from "core/database/decorator/selectFromGraphQLFields"
import toObject from "core/database/decorator/toObject"

// Set code length to 4
const nano = nanoid.bind(4)

@createModel
class Character extends Model {
  @toObject @fromFields static findMany({args}) {
    return super.findMany(args)
  }

  static createOne({args, options = {}}) {
    const {character} = args

    character.code = nano()

    return super.createOne(character, options)
  }

  static async createMany({args, options = {}}) {
    const {characters} = args

    for (const [idx, character] of characters.entries()) {
      const code = nano()

      characters[idx] = {
        ...character, code
      }
    }

    return super.createMany(characters, options)
  }
}

export default Character
