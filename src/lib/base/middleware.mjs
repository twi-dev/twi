import {join, basename} from "path"
import {readFileSync} from "fs"

const getFilenames = content => content
  .replace(/(#|\/\/).*$/gm, "") // Remove single line comments
  .split(/\r?\n/) // Split file per line
  .map(line => line.trim()) // Remove all spaces around each line
  .filter(String) // Remove all empty lines

const path = join(__dirname, "..", "middleware")

const filenames = getFilenames(readFileSync(join(path, ".sort"), "utf-8"))
  .map(filename => join(path, basename(filename)))

const middlewares = []

for (const filename of filenames) {
  const middleware = require(filename)

  middlewares.push(middleware.default || middleware)
}

export default middlewares
