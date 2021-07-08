import ava, {TestInterface} from "ava"

import {Connection} from "typeorm"
import {graphql} from "graphql"

import {setupConnection, cleanupConnection} from "__helper__/database"

import {ChapterRepo} from "repo/ChapterRepo"
import {StoryRepo} from "repo/StoryRepo"
import {UserRepo} from "repo/UserRepo"

import {Story} from "entity/Story"
import {User} from "entity/User"

import schema from "api/schema"
import StoryChapterAddInput from "api/input/story/ChapterAdd"

import createFakeChapters from "./__helper__/createFakeChapters"
import createFakeStories from "./__helper__/createFakeStories"
import createFakeUsers from "./__helper__/createFakeUsers"

import {createFakeContext} from "./__helper__/createFakeContext"

const test = ava as TestInterface<{
  db: Connection
  user: User
  story: Story
}>

const storyChapterAdd = /* GraphQL */ `
  mutation StoryChapterAdd($story: StoryChapterAddInput!) {
    storyChapterAdd(story: $story) {
      id
      title
      description
      text
    }
  }
`

test.before(async t => {
  const connection = await setupConnection()

  const [user] = createFakeUsers(1)
  const [story] = createFakeStories(1)

  const userRepo = connection.getCustomRepository(UserRepo)
  const storyRepo = connection.getCustomRepository(StoryRepo)

  story.publisher = user

  t.context.db = connection
  t.context.user = await userRepo.save(user)
  t.context.story = await storyRepo.save(story)
})

test("storyChapterAdd creates a new chapter", async t => {
  const {user, story, db} = t.context

  const [{title, description, text}] = createFakeChapters(1)

  const {data, errors} = await graphql({
    schema,
    source: storyChapterAdd,
    contextValue: createFakeContext({session: {userId: user.id}}),
    variableValues: {
      story: {
        id: story.id,
        chapter: {
          title,
          description,
          text
        }
      } as StoryChapterAddInput
    }
  })

  t.falsy(errors)

  const chapter = await db
    .getCustomRepository(ChapterRepo)
    .findOne(data!.storyChapterAdd.id)

  t.truthy(chapter)

  t.is(data!.storyChapterAdd.id, String(chapter!.id))
  t.is(data!.storyChapterAdd.title, chapter!.title)
  t.is(data!.storyChapterAdd.description, chapter!.description)
  t.is(data!.storyChapterAdd.text, chapter!.text)
})

test.after(async () => {
  await cleanupConnection()
})
