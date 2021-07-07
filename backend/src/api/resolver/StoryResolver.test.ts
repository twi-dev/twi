import ava, {TestInterface} from "ava"

import {Connection} from "typeorm"
import {graphql} from "graphql"
import {pick} from "lodash"

import {setupConnection, cleanupConnection} from "__helper__/database"

import {StoryRepo} from "repo/StoryRepo"
import {UserRepo} from "repo/UserRepo"

// import {Story} from "entity/Story"
import {User} from "entity/User"
// import {Tag} from "entity/Tag"

import schema from "api/schema"
import StoryAddInput from "api/input/story/Add"

import createFakeStories from "./__helper__/createFakeStories"
import createFakeUsers from "./__helper__/createFakeUsers"

const test = ava as TestInterface<{db: Connection, user: User}>

const storyAdd = /* GraphQL */ `
  mutation StoryAdd($story: StoryAddInput!) {
    storyAdd(story: $story) {
      id
      title
      description
      isDraft
      isFinished
      publisher {
        id
      }
    }
  }
`

test.before(async t => {
  const connection = await setupConnection()
  const userRepo = connection.getCustomRepository(UserRepo)

  const [user] = createFakeUsers(1)

  t.context.db = connection
  t.context.user = await userRepo.save(user)
})

test("storyAdd creates a new story", async t => {
  const [{title, description}] = createFakeStories(1)
  const {user, db} = t.context

  const {data, errors} = await graphql({
    schema,
    source: storyAdd,
    variableValues: {
      story: {
        title,
        description
      }
    },
    contextValue: {
      session: {
        userId: user.id
      },
      state: {}
    }
  })

  t.falsy(errors)

  const story = await db
    .getCustomRepository(StoryRepo)
    .findOne(data!.storyAdd.id)

  t.truthy(story)
  t.deepEqual(pick(story!, ["title", "description"]), {title, description})
  t.is(story!.publisher.id, user.id)
})

test("storyAdd has isDraft field set to true by default", async t => {
  const [{title, description}] = createFakeStories(1)
  const {user} = t.context

  const input: StoryAddInput = {title, description}

  const {data, errors} = await graphql({
    schema,
    source: storyAdd,
    variableValues: {
      story: input
    },
    contextValue: {
      session: {
        userId: user.id
      },
      state: {}
    }
  })

  t.falsy(errors)

  t.true(data!.storyAdd.isDraft)
})

test("storyAdd has isFinished field set to false by default", async (t) => {
  const [{title, description}] = createFakeStories(1)
  const {user} = t.context

  const input: StoryAddInput = {title, description}

  const {data, errors} = await graphql({
    schema,
    source: storyAdd,
    variableValues: {
      story: input
    },
    contextValue: {
      session: {
        userId: user.id
      },
      state: {}
    }
  })

  t.falsy(errors)

  t.false(data!.storyAdd.isFinished)
})

test.after(async () => {
  await cleanupConnection()
})
