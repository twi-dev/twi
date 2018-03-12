import {createModel, Model} from "core/database"

import nanoid from "core/helper/util/nanoid"

// Set code length to 4
const nano = nanoid.bind(4)

@createModel
class Genre extends Model {
  static async createOne(genre, options = {}) {
    const code = nano()

    return super.createOne({...genre, code}, options)
  }

  static async createMany(genres, options = {}) {
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
