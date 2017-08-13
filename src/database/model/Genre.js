import {createModel, Model} from "core/database"

import nanoid from "core/helper/util/nanoid"

// Set code length to 4
const nano = nanoid.bind(4)

@createModel
class Genre extends Model {
  static async createOne(genre) {
    const code = nano()

    return await super.createOne({...genre, code})
  }

  static async createMany(genres) {
    for (const [idx, genre] of genres.entries()) {
      const code = nano()

      genres[idx] = {
        ...genre, code
      }
    }

    return await super.createMany(genres)
  }
}

export default Genre
