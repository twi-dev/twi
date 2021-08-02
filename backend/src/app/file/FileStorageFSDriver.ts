import {dirname, extname, join, sep} from "path"
import {Readable} from "stream"

import {ensureDir, readFile, unlink, createWriteStream} from "fs-extra"
import {nanoid} from "nanoid/async"

import {
  FileStorageDriver,
  FileStorageWriteResult
} from "helper/file/FileStorage"
import {createHashFromPath} from "helper/util/createHashFromPath"

import pipe from "helper/util/pipe"

/**
 * FileStorage driver for file system
 */
export class FileStorageFSDriver implements FileStorageDriver {
  readonly root: string

  constructor(root: string) {
    this.root = root
  }

  async write(path: string, data: Readable): Promise<FileStorageWriteResult> {
    const dest = join(this.root, `${await nanoid()}${extname(path)}`)
    const key = dest.replace(this.root, "").replace(new RegExp(`^${sep}`), "")

    await ensureDir(dirname(path))
    await pipe(data, createWriteStream(dest))

    const hash = await createHashFromPath(dest)

    return {hash, key}
  }

  async read(key: string): Promise<Uint8Array> {
    return readFile(join(this.root, key))
  }

  async unlink(key: string): Promise<void> {
    return unlink(join(this.root, key))
  }
}
