import {resolve, isAbsolute} from "path"
import {createReadStream} from "fs"
import {createHash} from "crypto"

import {outputFile, unlink, readFile as read, WriteFileOptions} from "fs-extra"

export type FileHashAlgorithms = "sha256" | "sha512" | "md5"

export interface WriteFileResult {
  /**
   * Absolute path to the file
   */
  path: string,

  /**
   * SHA 512 hash of the file content
   */
  hash: string
}

const ROOT = resolve("static")

const normalizePath = (path: string): string => (
  isAbsolute(path) ? path : resolve(ROOT, path)
)

/**
 * Creates a hash from file contents.
 */
export async function createHashFromPath(
  path: string,
  algorithm: FileHashAlgorithms = "sha512"
): Promise<string> {
  const hash = createHash(algorithm)

  for await (const chunk of createReadStream(normalizePath(path))) {
    hash.update(chunk)
  }

  return hash.digest("hex")
}

/**
 * Writes file content to disk. If parent directory does not exists that directory will be created
 */
export async function writeFile(
  path: string,
  data: unknown,
  options: WriteFileOptions
): Promise<WriteFileResult> {
  path = normalizePath(path)

  await outputFile(path, data, options)

  const hash = await createHashFromPath(path)

  return {hash, path}
}

export const removeFile = (path: string) => unlink(normalizePath(path))

export const readFile = (path: string) => read(normalizePath(path))
