import {dirname, basename, extname, join} from "path"

import {readdir} from "promise-fs"

import isEmpty from "lodash/isEmpty"

const isArray = Array.isArray

async function normalizePath(path, extnames = []) {
  if (!isArray(extnames) || isEmpty(extnames)) {
    return path
  }

  const base = basename(path)
  const dir = dirname(path)

  const list = await readdir(dir)

  for (const name of list) {
    const ext = extname(name)

    if (extnames.includes(ext) && basename(name, ext) === base) {
      return join(dir, name)
    }
  }

  return path
}

const normalizePathCurry = extnames => path => normalizePath(path, extnames)

normalizePath.curry = normalizePathCurry

export default normalizePath

export {normalizePathCurry}
