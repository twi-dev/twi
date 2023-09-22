import {createReadStream, type ReadStream, type PathLike} from "node:fs"
import type {ReadableStream} from "node:stream/web"
import type {Readable} from "node:stream"
import {createHash} from "node:crypto"

import {isPathLike} from "./isPathLike.js"

type ValidAlgorithms = "sha256" | "sha512"

export async function createHashFromFileContent(
  algorithm: ValidAlgorithms,
  input: PathLike | Readable | ReadableStream<Uint8Array> | ReadStream
): Promise<string> {
  const hash = createHash(algorithm)

  const stream = isPathLike(input) ? createReadStream(input) : input

  for await (const chunk of stream) {
    hash.update(chunk)
  }

  return hash.digest("hex")
}
