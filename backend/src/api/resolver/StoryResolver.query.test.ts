import ava, {TestInterface} from "ava"

import {StoryPageResult} from "api/type/story/StoryPage"

import {Story} from "entity/Story"
import {User} from "entity/User"

import createFakeUsers from "__helper__/createFakeUsers"
import createFakeStories from "__helper__/createFakeStories"

import {setupConnection, cleanupConnection} from "__helper__/database"

import {
  withDatabase,
  WithDatabaseMacro,
  DatabaseContext
} from "../../__macro__/withDatabaseContext"
import {graphql} from "./__helper__/graphql"
import {createFakeContext} from "./__helper__/createFakeContext"

interface TestContext {
  user: User
  stories: Story[]
}

type Macro = WithDatabaseMacro<TestContext>

const test = ava as TestInterface<DatabaseContext & TestContext>

interface StoryQueryVariables {
  idOrSlug: string | number
}

interface StoryQueryResult {
  story: Story
}

const stroyQuery = /* GraphQL */ `
  query GetStory($idOrSlug: String!) {
    story(idOrSlug: $idOrSlug) {
      id
      title
      description
      slug
      isDraft
      isFinished
    }
  }
`

interface StoriesQueryVariables {
  page?: number
  limit?: number
}

interface StoriesQueryResult {
  stories: StoryPageResult
}

const storiesQuery = /* GraphQL */ `
  query GetStories($page: Int, $limit: Int) {
    stories(page: $page, limit: $limit) {
      count
      limit
      offset
      current
      hasNext
      last
      list {
        id
        title
        description
        slug
        isDraft
        isFinished
      }
    }
  }
`

test.before(async t => {
  const connection = await setupConnection()

  const userRepo = connection.em.getRepository(User)
  const storyRepo = connection.em.getRepository(Story)

  const [user] = createFakeUsers(1)

  const stories = createFakeStories(10)

  stories.forEach(story => {
    story.publisher = user
    story.isDraft = false
  })

  await userRepo.persistAndFlush(user)
  await storyRepo.persistAndFlush(stories)

  t.context.db = connection
  t.context.user = user
  t.context.stories = stories
})

test<Macro>("story returns a story by slug", withDatabase, async t => {
  const [story] = t.context.stories

  const {
    story: actual
  } = await graphql<StoryQueryResult, StoryQueryVariables>({
    source: stroyQuery,
    variableValues: {idOrSlug: story.slug},
    contextValue: createFakeContext()
  })

  t.is(Number(actual.id), story.id)
})

test<Macro>("story returns a story by ID", withDatabase, async t => {
  const [story] = t.context.stories

  const {
    story: actual
  } = await graphql<StoryQueryResult, StoryQueryVariables>({
    source: stroyQuery,
    variableValues: {idOrSlug: String(story.id)},
    contextValue: createFakeContext()
  })

  t.is(Number(actual.id), story.id)
})

test<Macro>(
  "stories returns list of the stories in the page frame",

  withDatabase,

  async t => {
    const {
      stories: actual
    } = await graphql<StoriesQueryResult, StoriesQueryVariables>({
      source: storiesQuery,
      contextValue: createFakeContext()
    })

    t.true(Array.isArray(actual.list))

    const [story] = actual.list

    t.true("id" in story)
    t.true("title" in story)
    t.true("description" in story)
    t.true("slug" in story)
  }
)

test.after.always(cleanupConnection)
