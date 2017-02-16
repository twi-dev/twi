import {readdirSync, readFileSync} from "fs"
import {basename, extname, join} from "path"

import {makeExecutableSchema} from "graphql-tools"
import junk from "junk"

import isFunction from "lodash/isFunction"
import isEmpty from "lodash/isEmpty"
import isString from "lodash/isString"
// import objectIterator from "server/core/helper/iterator/objectIterator"

function readToObj(path, ignore, reader) {
  if (isEmpty(path)) {
    throw new TypeError("Path cannot be empty.")
  }

  if (!isString(path)) {
    throw new TypeError("Path should be a string.")
  }

  if (isFunction(ignore)) {
    [reader, ignore] = [ignore, undefined]
  }

  const res = {}

  const files = readdirSync(path)

  for (let filename of files) {
    const ext = extname(filename)
    const key = basename(filename, ext)

    if (!isEmpty(ignore) && ignore.includes(ext) || junk.is(filename)) {
      continue
    }

    filename = join(path, filename)

    let content = null

    if (ext === ".js") {
      content = require(filename)
    } else if (typeof reader === "function") {
      content = reader(filename)
    } else {
      content = String(readFileSync(filename)) + "\n"
    }

    content && (res[key] = content)
  }

  return res
}
