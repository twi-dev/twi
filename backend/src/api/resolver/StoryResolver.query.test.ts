import ava, {TestInterface} from "ava"

import {Connection} from "typeorm"

import {setupConnection, cleanupConnection} from "__helper__/database"

import {StoryPageResult} from "api/type/story/StoryPage"

import {StoryRepo} from "repo/StoryRepo"
import {UserRepo} from "repo/UserRepo"

import {Story} from "entity/Story"
import {User} from "entity/User"

import createFakeStories from "__helper__/createFakeStories"
import createFakeUsers from "__helper__/createFakeUsers"

import {graphql} from "./__helper__/graphql"
import {createFakeContext} from "./__helper__/createFakeContext"

const test = ava as TestInterface<{
  db: Connection
  user: User
  stories: Story[]
}>

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

  const userRepo = connection.getCustomRepository(UserRepo)
  const storyRepo = connection.getCustomRepository(StoryRepo)

  const [user] = createFakeUsers(1)

  const stories = createFakeStories(10)

  stories.forEach(story => {
    story.publisher = user
    story.isDraft = false
  })

  t.context.db = connection
  t.context.user = await userRepo.save(user)
  t.context.stories = await storyRepo.save(stories)
})

test("story returns a story by slug", async t => {
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

test("story returns a story by ID", async (t) => {
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

test("stories returns list of the stories in the page frame", async t => {
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
})

test.after(async () => {
  await cleanupConnection()
})
