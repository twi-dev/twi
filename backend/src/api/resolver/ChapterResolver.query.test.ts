import ava, {TestInterface} from "ava"
import {HttpError} from "http-errors"

import {isString, isBoolean} from "lodash"

import {User, UserStatuses} from "entity/User"
import {Chapter} from "entity/Chapter"
import {Story} from "entity/Story"

import {ChapterPageResult} from "api/type/chapter/ChapterPage"

import {setupConnection, cleanupConnection} from "__helper__/database"

import createFakeChapters from "__helper__/createFakeChapters"
import createFakeStories from "__helper__/createFakeStories"
import createFakeUsers from "__helper__/createFakeUsers"

import PageVariables from "./__helper__/PageVariables"
import OperationError from "./__helper__/OperationError"

import {
  withDatabase,
  WithDatabaseMacro,
  DatabaseContext
} from "../../__macro__/withDatabaseContext"
import {graphql} from "./__helper__/graphql"

interface TestContext {
  user: User
  story: Story
  chapters: Chapter[]
}

type Macro = WithDatabaseMacro<TestContext>

const test = ava as TestInterface<DatabaseContext & TestContext>

interface ChapterQueryVariables {
  storyId: number
  number: number
}

interface ChapterQueryResult {
  chapter: Chapter
}

const chapterQuery = /* GraphQL */ `
  query GetChapter($storyId: ID!, $number: Int!) {
    chapter(storyId: $storyId, number: $number) {
      id
      title
      description
      text
      isDraft
      dates {
        createdAt
        updatedAt
        deletedAt
      }
    }
  }
`

interface ChaptersQueryVariables extends PageVariables {
  storyId: number
}

interface ChaptersQueryResult {
  chapters: ChapterPageResult
}

const chaptersQuery = /* GraphQL */ `
  query GetChapters($storyId: ID!, $page: Int, $limit: Int) {
    chapters(storyId: $storyId, page: $page, limit: $limit) {
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
        text
        isDraft
      }
    }
  }
`

test.before(async t => {
  const connection = await setupConnection()

  const [user] = createFakeUsers(1)
  const [story] = createFakeStories(1)

  const chapters = createFakeChapters(10)

  user.status = UserStatuses.ACTIVE

  story.publisher = user
  story.isDraft = false
  story.chaptersCount = 0

  chapters.forEach(chapter => {
    chapter.story = story
    chapter.isDraft = false

    story.chaptersCount += 1
    chapter.number = story.chaptersCount
  })

  await connection.em.getRepository(User).persistAndFlush(user)
  await connection.em.getRepository(Story).persistAndFlush(story)
  await connection.em.getRepository(Chapter).persistAndFlush(chapters)

  t.context.db = connection

  t.context.user = user
  t.context.story = story
  t.context.chapters = chapters
})

test<Macro>(
  "chapter returns chapter by story ID and its number within the story",

  withDatabase,

  async t => {
    const [{id, number, story}] = t.context.chapters

    const {
      chapter: actual
    } = await graphql<ChapterQueryResult, ChapterQueryVariables>({
      source: chapterQuery,
      variableValues: {storyId: story.id, number: number!}
    })

    t.is(Number(actual.id), id)
  }
)

test<Macro>("chapters returns a list of chapters", withDatabase, async t => {
  const {id} = t.context.story

  const {
    chapters: actual
  } = await graphql<ChaptersQueryResult, ChaptersQueryVariables>({
    source: chaptersQuery,
    variableValues: {storyId: id}
  })

  const [chapter] = actual.list

  t.false(Number.isNaN(Number(chapter.id)))
  t.true(isString(chapter.title))
  t.true(isString(chapter.description))
  t.true(isString(chapter.description))
  t.true(isBoolean(chapter.isDraft))
})

test<Macro>(
  "chapter throws 404 error if there are no matched results",

  withDatabase,

  async t => {
    const trap = (): Promise<never> => graphql<never, ChapterQueryVariables>({
      source: chapterQuery,
      variableValues: {
        storyId: 451,
        number: 42
      }
    })

    const {graphQLErrors} = await t.throwsAsync<OperationError>(trap)
    const [{originalError}] = graphQLErrors

    t.is((originalError as HttpError).statusCode, 404)
  }
)

test.after.always(async () => {
  await cleanupConnection()
})
