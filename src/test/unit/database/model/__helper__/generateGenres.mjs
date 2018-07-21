import {name, internet} from "faker"

import Genre from "database/model/Genre"

import range from "core/helper/util/range"

async function generateGenres(max = 6) {
  const genres = range(max - 1)
    .map(() => ({name: name.findName(), color: internet.color()}))

  const args = {genres}

  return Genre.createMany({args})
}

export default generateGenres
