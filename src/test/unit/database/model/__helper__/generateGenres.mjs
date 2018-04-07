import {name, internet} from "faker"

import Genre from "database/model/Genre"

import range from "core/helper/util/range"

async function generateGenres(max = 6) {
  const iterator = range(max - 1)

  const genres = []
  while (!iterator.next().done) {
    genres.push({
      name: name.findName(),
      color: internet.color()
    })
  }

  const args = {genres}

  return await Genre.createMany({args})
}

export default generateGenres
