import {dirname, extname, join, relative} from "path"
import {Readable} from "stream"

import {nanoid} from "nanoid/async"
import {ensureDir, readFile, unlink, createWriteStream} from "fs-extra"

import {
  FileStorageDriver,
  FileStorageWriteResult
} from "helper/file/FileStorage"
import {createHashFromPath} from "helper/file/createHashFromPath"

import pipe from "helper/util/pipe"

/**
 * FileStorage driver for file system
 */
export class FileStorageFSDriver implements FileStorageDriver {
  readonly ROOT: string

  constructor(root: string) {
    this.ROOT = root
  }

  async write(key: string, data: Readable): Promise<FileStorageWriteResult> {
    const dest = join(this.ROOT, `${await nanoid()}${extname(key)}`)

    await ensureDir(dirname(dest))
    await pipe(data, createWriteStream(dest))

    const hash = await createHashFromPath(dest)

    return {hash, key: relative(this.ROOT, dest)}
  }

  async read(key: string): Promise<Uint8Array> {
    return readFile(join(this.ROOT, key))
  }

  async unlink(key: string): Promise<void> {
    return unlink(join(this.ROOT, key))
  }
}
