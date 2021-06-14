import {resolve, isAbsolute} from "path"
import {createHash} from "crypto"
import {Readable} from "stream"

import {
  unlink,
  outputFile as w,
  readFile as r,
  ensureDir,
  WriteFileOptions,
  createReadStream,
  createWriteStream
} from "fs-extra"

import pipe from "./pipe"

const ROOT = resolve("static")

const normalizePath = (path: string): string => (
  isAbsolute(path) ? path : resolve(ROOT, path)
)

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
  options?: WriteFileOptions
): Promise<WriteFileResult> {
  path = normalizePath(path)

  if (typeof (data as object)[Symbol.asyncIterator] === "function") {
    data = Readable.from(data as AsyncIterableIterator<unknown>)
  }

  if (data instanceof Readable) {
    await ensureDir(path)
    await pipe(data, createWriteStream(path))
  } else {
    await w(path, data, options)
  }

  const hash = await createHashFromPath(path)

  return {hash, path}
}

export const removeFile = (path: string) => unlink(normalizePath(path))

export const readFile = (path: string) => r(normalizePath(path))
