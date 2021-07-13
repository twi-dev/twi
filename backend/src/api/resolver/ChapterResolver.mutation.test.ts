import ava, {TestInterface} from "ava"

import {Connection} from "typeorm"
import {HttpError} from "http-errors"

import {UserRepo} from "repo/UserRepo"
import {StoryRepo} from "repo/StoryRepo"
import {ChapterRepo} from "repo/ChapterRepo"

import {Chapter} from "entity/Chapter"
import {Story} from "entity/Story"
import {User} from "entity/User"

import {setupConnection, cleanupConnection} from "__helper__/database"

import StoryChapterAddInput from "api/input/story/ChapterAdd"
import ChapterUpdateInput from "api/input/chapter/Update"
import OperationError from "./__helper__/OperationError"

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

interface StoryChapterRemoveVariables {
  chapterId: number
}

// interface StoryChapterRemoveResult {
//   storyChapterRemove: number
// }

const storyChapterRemove = /* GraphQL */ `
  mutation StoryChapterRemove($chapterId: ID!) {
    storyChapterRemove(chapterId: $chapterId)
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

test(
  "storyChapterAdd throws an error when given story doesn't exists",

  async t => {
    const {user} = t.context

    const [{title, description, text}] = createFakeChapters(1)

    const trap = () => graphql<never, StoryChapterAddVariables>({
      source: storyChapterAdd,
      contextValue: createFakeContext({session: {userId: user.id}}),
      variableValues: {story: {id: 1024, chapter: {title, description, text}}}
    })

    const {graphQLErrors} = await t.throwsAsync<OperationError>(trap)
    const [{originalError}] = graphQLErrors

    t.is((originalError as HttpError).statusCode, 400)
  }
)

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

test("storyChapterUpdate removes description if set to null", async t => {
  const {user, story, db} = t.context

  const [chapter] = createFakeChapters(1)

  chapter.story = story

  await db.getCustomRepository(ChapterRepo).save(chapter)

  const {
    storyChapterUpdate: actual
  } = await graphql<StoryChapterUpdateResult, StoryChapterUpdateVariables>({
    source: storyChapterUpdate,
    contextValue: createFakeContext({session: {userId: user.id}}),
    variableValues: {chapter: {id: chapter.id, description: null}}
  })

  t.is(actual.description, null)
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

test(
  "storyChapterUpdate throws an error when given chapter doesn't exists",

  async t => {
    const {user} = t.context

    const [{text}] = createFakeChapters(1)

    const trap = () => graphql<never, StoryChapterUpdateVariables>({
      source: storyChapterUpdate,
      contextValue: createFakeContext({session: {userId: user.id}}),
      variableValues: {chapter: {id: 2048, text}}
    })

    const {graphQLErrors} = await t.throwsAsync<OperationError>(trap)
    const [{originalError}] = graphQLErrors

    t.is((originalError as HttpError).statusCode, 400)
  }
)

test(
  "storyChapterRemove throws an error when can't find a chapter",

  async t => {
    const {user} = t.context

    const trap = () => graphql<never, StoryChapterRemoveVariables>({
      source: storyChapterRemove,
      contextValue: createFakeContext({session: {userId: user.id}}),
      variableValues: {chapterId: 2048}
    })

    const {graphQLErrors} = await t.throwsAsync<OperationError>(trap)
    const [{originalError}] = graphQLErrors

    t.is((originalError as HttpError).statusCode, 400)
  }
)

test.after.always(async () => {
  await cleanupConnection()
})
