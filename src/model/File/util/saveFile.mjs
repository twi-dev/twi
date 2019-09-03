import {dirname} from "path"

import {copyFile, mkdir} from "promise-fs"

async function saveFile(oldPath, newPath) {
  let errored = false

  while (true) {
    try {
      await copyFile(oldPath, newPath)

      return undefined
    } catch (err) {
      if (errored || err.code !== "ENOENT") {
        throw err
      }

      errored = true

      await mkdir(dirname(newPath), {recursive: true})
    }
  }
}

export default saveFile
