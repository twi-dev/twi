import {createModel, Model} from "core/database"

import nanoid from "core/helper/util/nanoid"
import fromFields from "core/database/decorator/selectFromGraphQLFields"

// Set code length to 4
const nano = nanoid.bind(4)

@createModel
class Genre extends Model {
  @fromFields static findMany({args}) {
    return super.findMany(args)
  }

  @fromFields static findOne({args}) {
    return super.findOne(args)
  }

  @fromFields static findById({args}) {
    return super.findById(args.id)
  }

  static createOne({args, options}) {
    const {genre} = args

    genre.code = nano()

    return super.createOne(genre, options)
  }

  static createMany({args, options}) {
    const {genres} = args

    for (const [idx, genre] of genres.entries()) {
      const code = nano()

      genres[idx] = {...genre, code}
    }

    return super.createMany(genres, options)
  }
}

export default Genre
