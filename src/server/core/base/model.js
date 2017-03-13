import rd from "require-dir"
import thinky from "thinky"
import isFunction from "lodash/isFunction"

import objectIterator from "server/core/helper/iterator/objectIterator"
import {database as db} from "server/core/helper/util/configure"
import log from "server/core/log"

const SCHEMAS_ROOT = `${process.cwd()}/server/core/database`

const conn = thinky({
  createDatabase: false, // Prevent fucking thinky's default behaviour
  db: db.name
})

function buildModels() {
  const res = {}

  const schemas = rd(SCHEMAS_ROOT)

  for (const [name, schema] of objectIterator.entries(schemas)) {
    if (!isFunction(schema.default)) {
      log.warn(`Schema ${name} is not a function and will be skipped.`)
      continue
    }

    res[name] = conn.createModel(
      name, schema.default(conn.type), schema.options
    )
  }

  return res
}

const r = conn.r

export {conn as thinky, r}
export default buildModels()
