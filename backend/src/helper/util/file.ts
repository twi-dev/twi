import {resolve, basename, extname, isAbsolute} from "path"
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
import {nanoid} from "nanoid/async"

import pipe from "./pipe"

export const ROOT = resolve("static")

export const pathToAbsolute = (path: string): string => (
  isAbsolute(path) ? path : resolve(ROOT, path)
)

export const pathToRelative = (path: string) => path
  .replace(ROOT, "")
  .replace(/^(\/)?/, "")

export type FileHashAlgorithms = "sha256" | "sha512" | "md5"

export interface WriteFileResult {
  /**
   * Relative path to the file
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

  for await (const chunk of createReadStream(pathToAbsolute(path))) {
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
  path = pathToAbsolute(path)

  const name = basename(path)
  const ext = extname(name)
  const dir = path.replace(name, "")

  // Change filename no make sure it is unique
  path = resolve(dir, `${await nanoid()}${ext}`)

  if (typeof (data as object)[Symbol.asyncIterator] === "function") {
    data = Readable.from(data as AsyncIterableIterator<unknown>)
  }

  if (data instanceof Readable) {
    await ensureDir(path.replace(basename(path), ""))
    await pipe(data, createWriteStream(path))
  } else {
    await w(path, data, options)
  }

  const hash = await createHashFromPath(path)

  return {hash, path: pathToRelative(path)}
}

export const removeFile = (path: string) => unlink(pathToAbsolute(path))

export const readFile = (path: string) => r(pathToAbsolute(path))
