import {Readable} from "stream"

import {nanoid} from "nanoid/async"

import {
  FileStorageDriver,
  FileStorageWriteResult
} from "helper/file/FileStorage"
import {createHashFromPath} from "helper/file/createHashFromPath"

export class FileStorageMemoryDriver implements FileStorageDriver {
  readonly files = new Map<string, Uint8Array>()

  async write(path: string, data: Readable): Promise<FileStorageWriteResult> {
    const chunks: Uint8Array[] = []

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

  async getSize(key: string): Promise<number> {
    return this.files.get(key)!.byteLength
  }
}
