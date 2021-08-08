import {tmpdir} from "os"

import ava, {TestInterface} from "ava"

import fetch from "node-fetch"
import faker from "faker"

import {Container} from "typedi"
import {File as FileSource} from "formdata-node"

import {File} from "entity/File"
import {User, UserStatuses} from "entity/User"
import {FileStorage} from "helper/file/FileStorage"
import {FileStorageFSDriver} from "app/file/FileStorageFSDriver"

import createFakeUsers from "__helper__/createFakeUsers"

import {
  withDatabase,
  WithDatabaseMacro,
  DatabaseContext
} from "__macro__/withDatabaseContext"
import {setupConnection, cleanupConnection} from "__helper__/database"

import {createFakeContext} from "./__helper__/createFakeContext"
import {graphql} from "./__helper__/graphql"

interface TestContext {
  user: User
  image: FileSource
  fs: FileStorage
}

type Macro = WithDatabaseMacro<TestContext>

const test = ava as TestInterface<DatabaseContext & TestContext>

const userAvatarUpdate = /* GraphQL */ `
  mutation UserAvatarUpdate($image: FileInput!) {
    userAvatarUpdate(image: $image) {
      id
      url
      mime
      size
    }
  }
`

interface UserAvatarUpdateVariables {
  image: FileSource
}

interface UserAvatarUpdateResult {
  userAvatarUpdate: File
}

test.before(async t => {
  const fs = new FileStorage(new FileStorageFSDriver(tmpdir()))

  Container.set(FileStorage, fs)

  const response = await fetch(faker.internet.avatar())

  // TODO: Perhaps it would be better to use some local images for testing
  const image = new FileSource([await response.arrayBuffer()], "avatar.png", {
    type: "image/png"
  })

  t.context.fs = fs
  t.context.image = image
  t.context.db = await setupConnection()
})

test.beforeEach<Macro>(withDatabase, async t => {
  const {db} = t.context

  const [user] = createFakeUsers(1)

  user.status = UserStatuses.ACTIVE

  await db.em.getRepository(User).persistAndFlush(user)

  t.context.user = user
})

test.afterEach<Macro>(withDatabase, async t => {
  const {db, user} = t.context

  await db.em.getRepository(User).removeAndFlush(user)
})

test<Macro>("userAvatarUpdate updates user avatar", withDatabase, async t => {
  const {user, image, db} = t.context

  const {
    userAvatarUpdate: actual
  } = await graphql<UserAvatarUpdateResult, UserAvatarUpdateVariables>({
    source: userAvatarUpdate,
    variableValues: {image},
    contextValue: createFakeContext({session: {userId: user.id}})
  })

  const fileRepo = db.em.getRepository(File)

  const file = await fileRepo.findOne({id: actual.id})

  t.truthy(file)
})

test.after.always(async () => {
  await cleanupConnection()
})
