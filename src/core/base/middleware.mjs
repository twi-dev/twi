import {readFileSync} from "fs"
import {join} from "path"

const path = join(__dirname, "..", "middleware")
const lines = readFileSync(join(path, ".sort"), "utf-8")
  .replace(/(#|\/\/).*$/gm, "") // Remove single line comments
  .split(/\r?\n/) // Split file per line
  .map(line => line.trim()) // Remove all spaces around each line
  .filter(String) // Remove all empty lines

const middlewares = []

for (const file of lines) {
  const middleware = require(join(path, file))

  middlewares.push(middleware.default || middleware)
}

export default middlewares
