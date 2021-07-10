import ava, {TestInterface} from "ava"

import faker from "faker"

import {Connection} from "typeorm"

import {StoryRepo} from "repo/StoryRepo"
import {UserRepo} from "repo/UserRepo"

import {Story} from "entity/Story"
import {User} from "entity/User"

import StoryAddInput from "api/input/story/Add"
import StoryUpdateInput from "api/input/story/Update"

import {setupConnection, cleanupConnection} from "__helper__/database"

import createFakeStories from "__helper__/createFakeStories"
import createFakeUsers from "__helper__/createFakeUsers"

import {graphql} from "./__helper__/graphql"
import {createFakeContext} from "./__helper__/createFakeContext"

const test = ava as TestInterface<{
  db: Connection,
  user: User,
  stories: Story[]
}>

interface StoryAddVariables {
  story: StoryAddInput
}

interface StoryAddResult {
  storyAdd: Story
}

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
      tags {
        id
        name
        slug
      }
    }
  }
`

interface StoryUpdateVariables {
  story: Omit<StoryUpdateInput, "#id">
}

interface StoryUpdateResult {
  storyUpdate: Story
}

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

  const [user] = createFakeUsers(1)

  t.context.db = connection
  t.context.user = await userRepo.save(user)
})

test("storyAdd creates a new story", async t => {
  const [{title, description}] = createFakeStories(1)
  const {user} = t.context

  const {
    storyAdd: actual
  } = await graphql<StoryAddResult, StoryAddVariables>({
    source: storyAdd,
    variableValues: {story: {title, description}},
    contextValue: createFakeContext({session: {userId: user.id}})
  })

  t.is(actual.title, title)
  t.is(actual.description, description)
  t.is(actual.tags, null, "Tags must be null by default")
})

test("storyAdd allows to assing tags to created story", async t => {
  const [{title, description}] = createFakeStories(1)
  const {user} = t.context

  const expected = [
    "Slice of Life",
    "Sunset Shimmer",
    "Twilight Sparkle",
    "Princess Celestia"
  ]

  const {
    storyAdd: actual
  } = await graphql<StoryAddResult, StoryAddVariables>({
    source: storyAdd,
    variableValues: {story: {title, description, tags: expected}},
    contextValue: createFakeContext({session: {userId: user.id}})
  })

  // Sort tags here to make sure that arrays are deep equal
  // because TypeORM may persist them in a wrong order
  t.deepEqual(actual.tags!.map(({name}) => name).sort(), expected.sort())
})

test("storyAdd has isDraft field set to true by default", async t => {
  const [{title, description}] = createFakeStories(1)
  const {user} = t.context

  const {
    storyAdd: actual
  } = await graphql<StoryAddResult, StoryAddVariables>({
    source: storyAdd,
    variableValues: {story: {title, description}},
    contextValue: createFakeContext({session: {userId: user.id}})
  })

  t.true(actual.isDraft)
})

test("storyAdd has isFinished field set to false by default", async (t) => {
  const [{title, description}] = createFakeStories(1)
  const {user} = t.context

  const {
    storyAdd: actual
  } = await graphql<StoryAddResult, StoryAddVariables>({
    source: storyAdd,
    variableValues: {story: {title, description}},
    contextValue: createFakeContext({session: {userId: user.id}})
  })

  t.false(actual.isFinished)
})

test("storyUpdate allows to update title of the story", async t => {
  const expected = faker.lorem.words(3)

  const {user, db} = t.context

  const [story] = createFakeStories(1)

  story.publisher = user

  await db.getCustomRepository(StoryRepo).save(story)

  const {
    storyUpdate: actual
  } = await graphql<StoryUpdateResult, StoryUpdateVariables>({
    source: storyUpdate,
    variableValues: {story: {id: story.id, title: expected}},
    contextValue: createFakeContext({session: {userId: user.id}})
  })

  t.is(actual.title, expected)
})

test("storyUpdate allows to update description of the story", async (t) => {
  const expected = faker.lorem.paragraph()

  const {user, db} = t.context

  const [story] = createFakeStories(1)

  story.publisher = user

  await db.getCustomRepository(StoryRepo).save(story)

  const {
    storyUpdate: actual
  } = await graphql<StoryUpdateResult, StoryUpdateVariables>({
    source: storyUpdate,
    variableValues: {story: {id: story.id, description: expected}},
    contextValue: createFakeContext({session: {userId: user.id}})
  })

  t.is(actual.description, expected)
})

test(
  "storyUpdate will not update isFinished field when there's no chapters",

  async t => {
    const {user, db} = t.context

    const [story] = createFakeStories(1)

    story.publisher = user
    story.isFinished = false

    await db.getCustomRepository(StoryRepo).save(story)

    const {
      storyUpdate: actual
    } = await graphql<StoryUpdateResult, StoryUpdateVariables>({
      source: storyUpdate,
      variableValues: {story: {id: story.id, isFinished: true}},
      contextValue: createFakeContext({session: {userId: user.id}})
    })

    t.false(actual.isFinished)
  }
)

test.after(async () => {
  await cleanupConnection()
})
