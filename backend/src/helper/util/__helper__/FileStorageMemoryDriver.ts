import {Readable} from "stream"

import {nanoid} from "nanoid/async"

import {FileStorageDriver, FileStorageWriteResult} from "../FileStorage"
import {createHashFromPath} from "../createHashFromPath"

export class FileStorageMemoryDriver implements FileStorageDriver {
  files = new Map<string, Uint8Array>()

  async write(path: string, data: Readable): Promise<FileStorageWriteResult> {
    const chunks: Buffer[] = []

    for await (const chunk of data) {
      chunks.push(chunk)
    }

    const key = await nanoid()
    const hash = await createHashFromPath(path, "sha512")

    this.files.set(key, Buffer.concat(chunks))

    return {key, hash}
  }

  async read(key: string): Promise<Uint8Array> {
    return this.files.get(key)!
  }

  async unlink(key: string): Promise<void> {
    return void this.files.delete(key)
  }
}
