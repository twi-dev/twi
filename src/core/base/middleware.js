import {resolve, join} from "path"

// import invariant from "@octetstream/invariant"

import {readdir} from "promise-fs"

async function collectMiddlewares(config) {
  const dir = resolve(__dirname, "..", "middleware")
  const list = await readdir(dir)

  const middlewares = []
  for (const name of list) {
    if (/^([0-9]+)-/.test(name)) {
      const middleware = await import(join(dir, name))

      middlewares.push(middleware.default(config))
    }
  }

  return middlewares
}

export default collectMiddlewares
