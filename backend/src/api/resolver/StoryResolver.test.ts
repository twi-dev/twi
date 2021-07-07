import ava, {TestInterface} from "ava"

import faker from "faker"

import {Connection} from "typeorm"
import {graphql} from "graphql"
import {pick} from "lodash"

import {setupConnection, cleanupConnection} from "__helper__/database"

import {StoryRepo} from "repo/StoryRepo"
import {UserRepo} from "repo/UserRepo"

import {Story} from "entity/Story"
import {User} from "entity/User"
// import {Tag} from "entity/Tag"

import schema from "api/schema"
import StoryAddInput from "api/input/story/Add"
import StoryUpdateInput from "api/input/story/Update"

import createFakeStories from "./__helper__/createFakeStories"
import createFakeUsers from "./__helper__/createFakeUsers"

const test = ava as TestInterface<{
  db: Connection,
  user: User,
  stories: Story[]
}>

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

const storyUpdate = /* GraphQL */ `
  mutation StoryUpdate($story: StoryUpdateInput!) {
    storyUpdate(story: $story) {
      id
      title
      description
      isDraft
      isFinished
    }
  }
`

test.before(async t => {
  const connection = await setupConnection()
  const userRepo = connection.getCustomRepository(UserRepo)
  const storyRepo = connection.getCustomRepository(StoryRepo)

  const [user] = createFakeUsers(1)

  const stories = createFakeStories(10)

  stories.forEach(story => { story.publisher = user })

  t.context.db = connection
  t.context.user = await userRepo.save(user)
  t.context.stories = await storyRepo.save(stories)
})

test("storyAdd creates a new story", async t => {
  const [{title, description}] = createFakeStories(1)
  const {user, db} = t.context

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

test("storyUpdate allows to update title of the story", async t => {
  const expected = faker.lorem.words(3)

  const {user, db} = t.context

  const [story] = createFakeStories(1)

  story.publisher = user

  const storyRepo = db.getCustomRepository(StoryRepo)

  await storyRepo.save(story)

  const input = {
    id: story.id,
    title: expected
  }

  const {data, errors} = await graphql({
    schema,
    source: storyUpdate,
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
  t.is(data!.storyUpdate.title, expected)

  await storyRepo.remove(story)
})

test("storyUpdate allows to update description of the story", async (t) => {
  const expected = faker.lorem.paragraph()

  const {user, db} = t.context

  const [story] = createFakeStories(1)

  story.publisher = user

  const storyRepo = db.getCustomRepository(StoryRepo)

  await storyRepo.save(story)

  const input = {
    id: story.id,
    description: expected
  }

  const {data, errors} = await graphql({
    schema,
    source: storyUpdate,
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
  t.is(data!.storyUpdate.description, expected)

  await storyRepo.remove(story)
})

test.after(async () => {
  await cleanupConnection()
})
