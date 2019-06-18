import {createReadStream} from "fs"
import {createHash} from "crypto"

/**
 * Calculate sha512 has based of the on a file content.
 * The file will be read from given path.
 *
 * @param {string} path
 *
 * @return {string}
 */
async function calcHash(path) {
  const hash = createHash("sha512")

  for await (const chunk of createReadStream(path)) {
    hash.update(chunk)
  }

  return hash.digest("hex")
}

export default calcHash
