import {createReadStream} from "fs"
import {createHash} from "crypto"

export type FileHashAlgorithms = "sha256" | "sha512" | "md5"

/**
 * Creates a hash from file contents.
 */
export async function createHashFromPath(
  path: string,
  algorithm: FileHashAlgorithms = "sha512"
): Promise<string> {
  const hash = createHash(algorithm)

  for await (const chunk of createReadStream(path)) {
    hash.update(chunk)
  }

  return hash.digest("hex")
}
