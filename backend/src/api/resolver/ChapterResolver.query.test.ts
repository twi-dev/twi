import ava, {TestInterface} from "ava"

import {Connection} from "typeorm"

import {UserRepo} from "repo/UserRepo"
import {StoryRepo} from "repo/StoryRepo"
import {ChapterRepo} from "repo/ChapterRepo"

import {User, UserStatuses} from "entity/User"
import {Chapter} from "entity/Chapter"
import {Story} from "entity/Story"

import {setupConnection, cleanupConnection} from "__helper__/database"

import createFakeChapters from "__helper__/createFakeChapters"
import createFakeStories from "__helper__/createFakeStories"
import createFakeUsers from "__helper__/createFakeUsers"

import {graphql} from "./__helper__/graphql"

const test = ava as TestInterface<{
  db: Connection
  user: User
  story: Story
  chapters: Chapter[]
}>

interface ChapterQueryVariables {
  storyId: number,
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
    chapter.order = story.chaptersCount
  })

  await connection.getCustomRepository(UserRepo).save(user)
  await connection.getCustomRepository(StoryRepo).save(story)
  await connection.getCustomRepository(ChapterRepo).save(chapters)

  t.context.db = connection

  t.context.user = user
  t.context.story = story
  t.context.chapters = chapters
})

test(
  "chapter returns chapter by story ID and its number within the story",

  async t => {
    const [{id, order, story}] = t.context.chapters

    const {
      chapter: actual
    } = await graphql<ChapterQueryResult, ChapterQueryVariables>({
      source: chapterQuery,
      variableValues: {storyId: story.id, number: order!}
    })

    t.is(Number(actual.id), id)
  }
)

test.after.always(async () => {
  await cleanupConnection()
})
