import {Readable} from "stream"

import {Service} from "typedi"

export interface FileStorageWriteResult {
  /**
   * Object key inside of the storage.
   */
  key: string

  /**
   * SHA 512 hash of the file content.
   */
  hash: string
}

export interface FileStorageDriver {
  /**
   * Writes an object to the storage.
   *
   * @param key A path to file on disk.
   * @param data The data to put in the storage.
   */
  write(key: string, data: Readable): Promise<FileStorageWriteResult>

  /**
   * Reads an object from the storage.
   *
   * @param key Object key inside of the storage.
   */
  read(key: string): Promise<Uint8Array>

  /**
   * Removes an object from the storage.
   *
   * @param key Object key inside of the storage.
   */
  unlink(key: string): Promise<void>
}

@Service()
export class FileStorage<T extends FileStorageDriver> {
  readonly driver: T

  constructor(driver: T) {
    this.driver = driver
  }

  /**
   * Writes an object to the storage.
   *
   * @param key A path to file on disk.
   * @param data The data to put in the storage.
   */
  async write(key: string, data: Readable): Promise<FileStorageWriteResult> {
    return this.driver.write(key, data)
  }

  /**
   * Reads an object from the storage.
   *
   * @param key Object key inside of the storage.
   */
  async read(key: string): Promise<Uint8Array> {
    return this.driver.read(key)
  }

  /**
   * Removes an object from the storage.
   *
   * @param key Object key inside of the storage.
   */
  async unlink(key: string): Promise<void> {
    return this.driver.unlink(key)
  }
}
