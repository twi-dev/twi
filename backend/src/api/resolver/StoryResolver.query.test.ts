import ava, {TestInterface} from "ava"

import {Connection} from "typeorm"
import {graphql} from "graphql"

import {setupConnection, cleanupConnection} from "__helper__/database"

import {StoryRepo} from "repo/StoryRepo"
import {UserRepo} from "repo/UserRepo"

import {Story} from "entity/Story"
import {User} from "entity/User"

import schema from "api/schema"

import createFakeStories from "./__helper__/createFakeStories"
import createFakeUsers from "./__helper__/createFakeUsers"

import {createFakeContext} from "./__helper__/createFakeContext"

const test = ava as TestInterface<{
  db: Connection
  user: User
  stories: Story[]
}>

interface StoryQueryInput {
  idOrSlug: string | number
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

  const {data, errors} = await graphql({
    schema,
    source: stroyQuery,
    variableValues: {
      idOrSlug: story.slug
    } as StoryQueryInput,
    contextValue: createFakeContext()
  })

  t.falsy(errors)
  t.is(data!.story.id, String(story.id))
})

test("story returns a story by ID", async (t) => {
  const [story] = t.context.stories

  const {data, errors} = await graphql({
    schema,
    source: stroyQuery,
    variableValues: {
      idOrSlug: String(story.id)
    } as StoryQueryInput,
    contextValue: createFakeContext()
  })

  t.falsy(errors)
  t.is(data!.story.id, String(story.id))
})

test("stories returns list of the stories in the page frame", async t => {
  const {data, errors} = await graphql({
    schema,
    source: storiesQuery,
    contextValue: createFakeContext()
  })

  t.falsy(errors)
  t.true("list" in data!.stories)
})

test.after(async () => {
  await cleanupConnection()
})
