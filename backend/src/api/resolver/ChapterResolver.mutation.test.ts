import ava, {TestInterface} from "ava"

import {HttpError} from "http-errors"

import {Chapter} from "entity/Chapter"
import {Story} from "entity/Story"
import {User} from "entity/User"

import {setupConnection, cleanupConnection} from "__helper__/database"

import StoryChapterAddInput from "api/input/story/ChapterAdd"
import ChapterUpdateInput from "api/input/chapter/Update"

import createFakeChapters from "__helper__/createFakeChapters"
import createFakeStories from "__helper__/createFakeStories"
import createFakeUsers from "__helper__/createFakeUsers"

import {
  withDatabase,
  WithDatabaseMacro,
  DatabaseContext
} from "../../__macro__/withDatabaseContext"
import {graphql} from "./__helper__/graphql"
import {createFakeContext} from "./__helper__/createFakeContext"

import OperationError from "./__helper__/OperationError"

interface TestContext {
  user: User
  story: Story
}

type Macro = WithDatabaseMacro<TestContext>

const test = ava as TestInterface<DatabaseContext & TestContext>

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

interface StoryChapterRemoveResult {
  storyChapterRemove: number
}

const storyChapterRemove = /* GraphQL */ `
  mutation StoryChapterRemove($chapterId: ID!) {
    storyChapterRemove(chapterId: $chapterId)
  }
`

test.before(async t => {
  const connection = await setupConnection()

  const [user] = createFakeUsers(1)

  const userRepo = connection.em.getRepository(User)

  await userRepo.persistAndFlush(user)

  t.context.db = connection
  t.context.user = user
})

test.beforeEach<Macro>(withDatabase, async t => {
  const {user, db} = t.context

  const [story] = createFakeStories(1)

  story.publisher = user

  await db.em.getRepository(Story).persistAndFlush(story)

  t.context.story = story
})

test.afterEach<Macro>(withDatabase, async t => {
  const {story, db} = t.context

  await db.em.getRepository(Story).removeAndFlush(story)
})

test<Macro>("storyChapterAdd creates a new chapter", withDatabase, async t => {
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

test<Macro>(
  "storyChapterAdd throws an error when given story doesn't exists",

  withDatabase,

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

test<Macro>("storyChapterUpdate updates a title", withDatabase, async t => {
  const {user, story, db} = t.context

  const [{title}, chapter] = createFakeChapters(2)

  chapter.story = story

  await db.em.getRepository(Chapter).persistAndFlush(chapter)

  const {
    storyChapterUpdate: actual
  } = await graphql<StoryChapterUpdateResult, StoryChapterUpdateVariables>({
    source: storyChapterUpdate,
    contextValue: createFakeContext({session: {userId: user.id}}),
    variableValues: {chapter: {id: chapter.id, title}}
  })

  t.is(actual.title, title)
})

test<Macro>(
  "storyChapterUpdate updates a description",

  withDatabase,

  async t => {
    const {user, story, db} = t.context

    const [{description}, chapter] = createFakeChapters(2)

    chapter.story = story

    await db.em.getRepository(Chapter).persistAndFlush(chapter)

    const {
      storyChapterUpdate: actual
    } = await graphql<StoryChapterUpdateResult, StoryChapterUpdateVariables>({
      source: storyChapterUpdate,
      contextValue: createFakeContext({session: {userId: user.id}}),
      variableValues: {chapter: {id: chapter.id, description}}
    })

    t.is(actual.description, description)
  }
)

test<Macro>(
  "storyChapterUpdate removes description if set to null",

  withDatabase,

  async t => {
    const {user, story, db} = t.context

    const [chapter] = createFakeChapters(1)

    chapter.story = story

    await db.em.getRepository(Chapter).persistAndFlush(chapter)

    const {
      storyChapterUpdate: actual
    } = await graphql<StoryChapterUpdateResult, StoryChapterUpdateVariables>({
      source: storyChapterUpdate,
      contextValue: createFakeContext({session: {userId: user.id}}),
      variableValues: {chapter: {id: chapter.id, description: null}}
    })

    t.is(actual.description, null)
  }
)

test<Macro>("storyChapterUpdate updates a text", withDatabase, async t => {
  const {user, story, db} = t.context

  const [{text}, chapter] = createFakeChapters(2)

  chapter.story = story

  await db.em.getRepository(Chapter).persistAndFlush(chapter)

  const {
    storyChapterUpdate: actual
  } = await graphql<StoryChapterUpdateResult, StoryChapterUpdateVariables>({
    source: storyChapterUpdate,
    contextValue: createFakeContext({session: {userId: user.id}}),
    variableValues: {chapter: {id: chapter.id, text}}
  })

  t.is(actual.text, text)
})

test<Macro>(
  "storyChapterUpdate throws an error when given chapter doesn't exists",

  withDatabase,

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

test<Macro>(
  "storyChapterRemove removes chapter by given ID",

  withDatabase,

  async t => {
    const {user, story, db} = t.context
    const [chapter] = createFakeChapters(1)

    chapter.story = story

    await db.em.getRepository(Chapter).persistAndFlush(chapter)

    const {
      storyChapterRemove: actual
    } = await graphql<StoryChapterRemoveResult, StoryChapterRemoveVariables>({
      source: storyChapterRemove,
      contextValue: createFakeContext({session: {userId: user.id}}),
      variableValues: {chapterId: chapter.id}
    })

    t.is(Number(actual), chapter.id)
  }
)

test<Macro>(
  "storyChapterRemove throws an error when can't find a chapter",

  withDatabase,

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
