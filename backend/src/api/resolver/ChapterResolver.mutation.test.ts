import ava, {TestInterface} from "ava"

import {Connection} from "typeorm"

import {setupConnection, cleanupConnection} from "__helper__/database"

import {UserRepo} from "repo/UserRepo"
import {StoryRepo} from "repo/StoryRepo"
import {ChapterRepo} from "repo/ChapterRepo"

import {Chapter} from "entity/Chapter"
import {Story} from "entity/Story"
import {User} from "entity/User"

import StoryChapterAddInput from "api/input/story/ChapterAdd"
import ChapterUpdateInput from "api/input/chapter/Update"

import createFakeChapters from "__helper__/createFakeChapters"
import createFakeStories from "__helper__/createFakeStories"
import createFakeUsers from "__helper__/createFakeUsers"

import {graphql} from "./__helper__/graphql"
import {createFakeContext} from "./__helper__/createFakeContext"

const test = ava as TestInterface<{
  db: Connection
  user: User
  story: Story
}>

interface StoryChapterAddVariables {
  story: Omit<StoryChapterAddInput, "#id">
}

interface StoryChapterAddResult {
  storyChapterAdd: Chapter
}

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

interface StoryChapterUpdateVariables {
  chapter: Omit<ChapterUpdateInput, "#id">
}

interface StoryChapterUpdateResult {
  storyChapterUpdate: Chapter
}

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
  const {user, story} = t.context

  const [{title, description, text}] = createFakeChapters(1)

  const {
    storyChapterAdd: actual
  } = await graphql<StoryChapterAddResult, StoryChapterAddVariables>({
    source: storyChapterAdd,
    contextValue: createFakeContext({session: {userId: user.id}}),
    variableValues: {
      story: {
        id: story.id,
        chapter: {title, description, text}
      }
    }
  })

  t.is(actual.title, title)
  t.is(actual.description, description)
  t.is(actual.text, text)
})

test("storyChapterUpdate updates a title", async t => {
  const {user, story, db} = t.context

  const [{title}, chapter] = createFakeChapters(2)

  chapter.story = story

  await db.getCustomRepository(ChapterRepo).save(chapter)

  const {
    storyChapterUpdate: actual
  } = await graphql<StoryChapterUpdateResult, StoryChapterUpdateVariables>({
    source: storyChapterUpdate,
    contextValue: createFakeContext({session: {userId: user.id}}),
    variableValues: {chapter: {id: chapter.id, title}}
  })

  t.is(actual.title, title)
})

test("storyChapterUpdate updates a description", async t => {
  const {user, story, db} = t.context

  const [{description}, chapter] = createFakeChapters(2)

  chapter.story = story

  await db.getCustomRepository(ChapterRepo).save(chapter)

  const {
    storyChapterUpdate: actual
  } = await graphql<StoryChapterUpdateResult, StoryChapterUpdateVariables>({
    source: storyChapterUpdate,
    contextValue: createFakeContext({session: {userId: user.id}}),
    variableValues: {chapter: {id: chapter.id, description}}
  })

  t.is(actual.description, description)
})

test("storyChapterUpdate updates a text", async t => {
  const {user, story, db} = t.context

  const [{text}, chapter] = createFakeChapters(2)

  chapter.story = story

  await db.getCustomRepository(ChapterRepo).save(chapter)

  const {
    storyChapterUpdate: actual
  } = await graphql<StoryChapterUpdateResult, StoryChapterUpdateVariables>({
    source: storyChapterUpdate,
    contextValue: createFakeContext({session: {userId: user.id}}),
    variableValues: {chapter: {id: chapter.id, text}}
  })

  t.is(actual.text, text)
})

test.after(async () => {
  await cleanupConnection()
})
