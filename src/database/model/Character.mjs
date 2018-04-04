import {createModel, Model} from "core/database"

import nanoid from "core/helper/util/nanoid"
import getFieldSelectionsList from "core/graphql/getFieldSelectionsList"

// Set code length to 4
const nano = nanoid.bind(4)

@createModel
class Character extends Model {
  static async findMany({args, options, node}) {
    const selections = getFieldSelectionsList(node)

    const users = await super.findMany(args).select(selections)

    return this._tryConvert(users, options)
  }

  static async createOne({args, options = {}}) {
    const {character} = args

    const code = nano()

    return super.createOne({...character, code}, options)
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
