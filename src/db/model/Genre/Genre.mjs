import partial from "lodash/partial"
import nanoid from "nanoid"

import {createModel, Model} from "core/db"

const isArray = Array.isArray

// Set code length to 4
const generateCode = partial(nanoid, 4)

@createModel
class Genre extends Model {
  static createOne(genre, options) {
    genre.code = generateCode()

    return super.createOne(genre, options)
  }

  static createMany(genres, options) {
    if (!isArray(genres)) {
      genres = [genres]
    }

    for (const [idx, genre] of genres.entries()) {
      const code = generateCode()

      genres[idx] = {...genre, code}
    }

    return super.createMany(genres, options)
  }
}

export default Genre
