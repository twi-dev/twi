import {createReadStream} from "fs"
import {createHash} from "crypto"

/**
 * Calculate hash based on a file content.
 * The file will be read from given path.
 *
 * @param {string} filename
 * @param {string} algorithm
 * @param {import("crypto").HashOptions} [options = {}]
 *
 * @return {string}
 */
async function calcHash(filename, algorithm, options) {
  const hash = createHash(algorithm, options)

  for await (const chunk of createReadStream(filename)) {
    hash.update(chunk)
  }

  return hash.digest("hex")
}

export default calcHash
