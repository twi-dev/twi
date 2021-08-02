import {createReadStream, promises as fs} from "fs"
import {resolve} from "path"

import ava, {TestInterface} from "ava"

import {FileStorageMemoryDriver} from "./__helper__/FileStorageMemoryDriver"
import {FileStorage} from "./FileStorage"

const test = ava as TestInterface<{
  storage: FileStorage,
  driver: FileStorageMemoryDriver
}>

const filePath = resolve("..", "license")

test.beforeEach(t => {
  const driver = new FileStorageMemoryDriver()
  const storage = new FileStorage(driver)

  t.context.driver = driver
  t.context.storage = storage
})

test(".read() reads file from the storage", async t => {
  const {driver, storage} = t.context

  const {key} = await driver.write(filePath, createReadStream(filePath))

  const file = await storage.read(key)

  t.true(Buffer.from(file).equals(await fs.readFile(filePath)))
})

test(".write() writes file to the storage", async t => {
  const {driver, storage} = t.context

  const {key} = await storage.write(filePath, createReadStream(filePath))

  t.true(driver.files.has(key))
})

test(".unlink() removes file from the storage", async t => {
  const {driver, storage} = t.context

  const {key} = await driver.write(filePath, createReadStream(filePath))

  t.true(driver.files.has(key))

  await storage.unlink(key)

  t.false(driver.files.has(key))
})
