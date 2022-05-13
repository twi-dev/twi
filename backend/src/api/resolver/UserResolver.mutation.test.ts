import {Readable} from "stream"
import {join} from "path"

import ava, {TestInterface} from "ava"

import fetch from "node-fetch"
import faker from "faker"

import {File as FileSource} from "formdata-node"

import {File} from "entity/File"
import {User, UserStatuses} from "entity/User"
import {FileStorage} from "helper/file/FileStorage"

import createFakeUsers from "__helper__/createFakeUsers"

import {
  withOrm,
  WithOrmMacro,
  DatabaseContext
} from "__macro__/withOrm"
import {setupFs, cleanupFs} from "__helper__/fs"
import {setupConnection, cleanupConnection} from "__helper__/database"

import {createFakeContext} from "./__helper__/createFakeContext"
import {graphql} from "./__helper__/graphql"

interface TestContext {
  user: User
  image: FileSource
  fs: FileStorage
}

type Macro = WithOrmMacro<TestContext>

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

const userAvatarRemove = /* GraphQL */ `
  mutation {
    userAvatarRemove
  }
`

interface UserAvatarRemoveResult {
  userAvatarRemove: number
}

test.before(async t => {
  const response = await fetch(faker.internet.avatar())

  // TODO: Perhaps it would be better to use some local images for testing
  const image = new FileSource([await response.arrayBuffer()], "avatar.png", {
    type: "image/png"
  })

  t.context.image = image
  t.context.fs = await setupFs()
  t.context.db = await setupConnection()
})

test.beforeEach<Macro>(withOrm, async t => {
  const {db} = t.context

  const [user] = createFakeUsers(1)

  user.status = UserStatuses.ACTIVE

  await db.em.getRepository(User).persistAndFlush(user)

  t.context.user = user
})

test.afterEach<Macro>(withOrm, async t => {
  const {db, user} = t.context

  await db.em.getRepository(User).removeAndFlush(user)
})

test<Macro>("userAvatarUpdate updates user avatar", withOrm, async t => {
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

test<Macro>("userAvatarUpdate has required fields", withOrm, async t => {
  const {user, image} = t.context

  const {
    userAvatarUpdate: actual
  } = await graphql<UserAvatarUpdateResult, UserAvatarUpdateVariables>({
    source: userAvatarUpdate,
    variableValues: {image},
    contextValue: createFakeContext({session: {userId: user.id}})
  })

  t.true("id" in actual)
  t.true("url" in actual)
  t.true("size" in actual)
  t.true("mime" in actual)
})

test<Macro>("userAvatarRemove removes user avatar", withOrm, async t => {
  const {user, db, image, fs} = t.context

  const {
    hash, key
  } = await fs.write(
    join("user", String(user.id), "avatar", image.name),

    Readable.from(image.stream())
  )

  const file = new File({hash, key, name: image.name, mime: image.type})

  user.avatar = file

  await db.em.getRepository(User).persistAndFlush(user)

  const {
    userAvatarRemove: actual
  } = await graphql<UserAvatarRemoveResult>({
    source: userAvatarRemove,
    contextValue: createFakeContext({session: {userId: user.id}})
  })

  // Perhaps I will use UUID as file ID in a future
  t.is(String(actual), String(file.id))
})

test.after.always(async () => {
  await cleanupConnection()
  await cleanupFs()
})
