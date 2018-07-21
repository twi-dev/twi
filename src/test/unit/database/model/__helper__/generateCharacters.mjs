import {name, system} from "faker"

import Character from "database/model/Character"

import range from "core/helper/util/range"

async function generateCharacters(max = 6) {
  const characters = range(max - 1)
    .map(() => ({name: name.findName(), pic: system.fileName()}))

  const args = {characters}

  return Character.createMany({args})
}

export default generateCharacters
