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
import ChapterUpdateInput from "api/input/chapter/Update"

import createFakeChapters from "__helper__/createFakeChapters"
import createFakeStories from "__helper__/createFakeStories"
import createFakeUsers from "__helper__/createFakeUsers"

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

const storyChapterUpdate = /* GraphQL */ `
  mutation StoryChapterUpdate($chapter: ChapterUpdateInput!) {
    storyChapterUpdate(chapter: $chapter) {
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

test("storyChapterUpdate updates a title", async t => {
  const {user, story, db} = t.context

  const [{title}, chapter] = createFakeChapters(2)

  chapter.story = story

  await db.getCustomRepository(ChapterRepo).save(chapter)

  const {data, errors} = await graphql({
    schema,
    source: storyChapterUpdate,
    contextValue: createFakeContext({session: {userId: user.id}}),
    variableValues: {
      chapter: {id: chapter.id, title} as ChapterUpdateInput
    }
  })

  t.falsy(errors)

  t.not(data!.storyChapterUpdate.title, chapter.title)
  t.is(data!.storyChapterUpdate.title, title)
})

test("storyChapterUpdate updates a description", async t => {
  const {user, story, db} = t.context

  const [{description}, chapter] = createFakeChapters(2)

  chapter.story = story

  await db.getCustomRepository(ChapterRepo).save(chapter)

  const {data, errors} = await graphql({
    schema,
    source: storyChapterUpdate,
    contextValue: createFakeContext({session: {userId: user.id}}),
    variableValues: {
      chapter: {id: chapter.id, description} as ChapterUpdateInput
    }
  })

  t.falsy(errors)

  t.not(data!.storyChapterUpdate.description, chapter.description)
  t.is(data!.storyChapterUpdate.description, description)
})

test("storyChapterUpdate updates a text", async (t) => {
  const {user, story, db} = t.context

  const [{text}, chapter] = createFakeChapters(2)

  chapter.story = story

  await db.getCustomRepository(ChapterRepo).save(chapter)

  const {data, errors} = await graphql({
    schema,
    source: storyChapterUpdate,
    contextValue: createFakeContext({session: {userId: user.id}}),
    variableValues: {
      chapter: {id: chapter.id, text} as ChapterUpdateInput
    }
  })

  t.falsy(errors)

  t.not(data!.storyChapterUpdate.text, chapter.text)
  t.is(data!.storyChapterUpdate.text, text)
})

test.after(async () => {
  await cleanupConnection()
})
