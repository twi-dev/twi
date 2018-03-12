import {resolve, join} from "path"

import {readdir} from "promise-fs"

async function collectMiddlewares(config) {
  const dir = resolve(__dirname, "..", "middleware")
  const list = await readdir(dir)

  const middlewares = []
  for (const name of list) {
    if (/^([0-9]+)-/.test(name)) {
      const middleware = await Promise.resolve()
        .then(() => require(join(dir, name)))

      middlewares.push(middleware.default(config))
    }
  }

  return middlewares
}

export default collectMiddlewares
