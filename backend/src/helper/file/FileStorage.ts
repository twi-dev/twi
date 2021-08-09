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

  /**
   * Returns size of the file in bytes.
   *
   * @param key Object key inside of the storage.
   */
  getSize(key: string): Promise<number>

  /**
   * Returns URL assiciated with file.
   *
   * @param key Object key inside of the storage.
   */
  getURL(key: string): Promise<string>
}

@Service()
export class FileStorage<T extends FileStorageDriver = FileStorageDriver> {
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

  /**
   * Returns size of the file in bytes.
   *
   * @param key Object key inside of the storage.
   */
  async getSize(key: string): Promise<number> {
    return this.driver.getSize(key)
  }

  /**
   * Returns URL assiciated with file.
   *
   * @param key Object key inside of the storage.
   */
  async getURL(key: string): Promise<string> {
    return this.driver.getURL(key)
  }
}
