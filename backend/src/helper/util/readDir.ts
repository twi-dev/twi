import {resolve, isAbsolute, extname} from "path"

import globby from "globby"

const EXTNAME = extname(__filename)

const EXCLUDE_FILES = ["*.test"].map(name => `${name}${EXTNAME}`)

const EXCLUDE_DIRS = ["__helper__", "__fixture__"]

const EXCLUDE = [...EXCLUDE_DIRS, ...EXCLUDE_FILES].map(name => `!${name}`)

async function* readDir(dir: string) {
  if (!isAbsolute(dir)) {
    throw new Error("Path to the directory must be absolute")
  }

  dir = resolve(dir, `*${EXTNAME}`)

  for await (const path of globby.stream([dir, ...EXCLUDE])) {
    yield String(path)
  }
}

export default readDir
