import {createModel, Model} from "core/database"

import nanoid from "core/helper/util/nanoid"
import getFieldSelectionsList from "core/graphql/getFieldSelectionsList"

// Set code length to 4
const nano = nanoid.bind(4)

@createModel
class Genre extends Model {
  static async findMany({args, options, node}) {
    const selections = getFieldSelectionsList(node)

    const users = await super.findMany(args).select(selections)

    return this._tryConvert(users, options)
  }

  static async createOne({args, options = {}}) {
    const {genre} = args

    const code = nano()

    return super.createOne({...genre, code}, options)
  }

  static async createMany({args, options = {}}) {
    const {genres} = args

    for (const [idx, genre] of genres.entries()) {
      const code = nano()

      genres[idx] = {
        ...genre, code
      }
    }

    return super.createMany(genres, options)
  }
}

export default Genre
