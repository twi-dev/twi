import {name, system} from "faker"

import Character from "database/model/Character"

import range from "core/helper/util/range"

async function generateCharacters(max = 6) {
  const iterator = range(max - 1)

  const characters = []
  while (!iterator.next().done) {
    characters.push({
      name: name.findName(),

      // TODO: replace it with system.filePath
      //   when this one will be added to faker.js
      pic: system.fileName()
    })
  }

  const args = {characters}

  return await Character.createMany({args})
}

export default generateCharacters
