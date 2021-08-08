import {join} from "path"
import {tmpdir} from "os"

import {remove, ensureDir} from "fs-extra"
import {Container} from "typedi"
import {nanoid} from "nanoid"

import {FileStorageFSDriver} from "app/file/FileStorageFSDriver"
import {FileStorage} from "helper/file/FileStorage"

const ROOT = join(tmpdir(), nanoid())

export async function setupFs() {
  await ensureDir(ROOT)

  const fs = new FileStorage(new FileStorageFSDriver(ROOT))

  Container.set(FileStorage, fs)

  return fs
}

export async function cleanupFs() {
  await remove(ROOT)
}
