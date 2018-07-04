import {resolve, join} from "path"

import {readdirSync} from "fs"

function collectMiddlewares(config) {
  const dir = resolve(__dirname, "..", "middleware")
  const list = readdirSync(dir)

  const middlewares = []
  for (const name of list) {
    if (/^([0-9]+)-/.test(name)) {
      const middleware = require(join(dir, name))

      middlewares.push(middleware.default(config))
    }
  }

  return middlewares
}

export default collectMiddlewares
