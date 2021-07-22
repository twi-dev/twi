import ava, {TestInterface} from "ava"

import faker from "faker"

import {HttpError} from "http-errors"

import {Chapter} from "entity/Chapter"
import {Story} from "entity/Story"
import {User} from "entity/User"
import {Tag} from "entity/Tag"

import StoryAddInput from "api/input/story/Add"
import StoryUpdateInput from "api/input/story/Update"

import {setupConnection, cleanupConnection} from "__helper__/database"

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
}

type Macro = WithDatabaseMacro<TestContext>

const test = ava as TestInterface<DatabaseContext & TestContext>

interface StoryAddVariables {
  story: StoryAddInput
}

interface StoryAddResult {
  storyAdd: Story
}

const storyAdd = /* GraphQL */ `
  mutation StoryAdd($story: StoryAddInput!) {
    storyAdd(story: $story) {
      id
      title
      description
      isDraft
      isFinished
      publisher {
        id
      }
      tags {
        id
        name
        slug
      }
    }
  }
`

interface StoryUpdateVariables {
  story: Omit<StoryUpdateInput, "#id">
}

interface StoryUpdateResult {
  storyUpdate: Story
}

const storyUpdate = /* GraphQL */ `
  mutation StoryUpdate($story: StoryUpdateInput!) {
    storyUpdate(story: $story) {
      id
      title
      description
      isDraft
      isFinished
      publisher {
        id
      }
      tags {
        id
        name
        slug
      }
    }
  }
`

interface StoryRemoveVariables {
  storyId: number
}

interface StoryRemoveResult {
  storyRemove: number
}

const storyRemove = /* GraphQL */ `
  mutation StoryRemove($storyId: ID!) {
    storyRemove(storyId: $storyId)
  }
`

test.before(async t => {
  const connection = await setupConnection()
  const userRepo = connection.em.getRepository(User)

  const [user] = createFakeUsers(1)

  await userRepo.persistAndFlush(user)

  t.context.db = connection
  t.context.user = user
})

test<Macro>("storyAdd creates a new story", withDatabase, async t => {
  const [{title, description}] = createFakeStories(1)
  const {user} = t.context

  const {
    storyAdd: actual
  } = await graphql<StoryAddResult, StoryAddVariables>({
    source: storyAdd,
    variableValues: {story: {title, description}},
    contextValue: createFakeContext({session: {userId: user.id}})
  })

  t.is(actual.title, title)
  t.is(actual.description, description)
  t.deepEqual(
    actual.tags as any as Tag[],

    [],

    "Tags must be resolved as an empty array by default"
  )
})

test<Macro>(
  "storyAdd allows to assing tags to created story",

  withDatabase,

  async t => {
    const [{title, description}] = createFakeStories(1)
    const {user} = t.context

    const expected = [
      "Slice of Life",
      "Sunset Shimmer",
      "Twilight Sparkle",
      "Princess Celestia"
    ]

    const {
      storyAdd: actual
    } = await graphql<StoryAddResult, StoryAddVariables>({
      source: storyAdd,
      variableValues: {story: {title, description, tags: expected}},
      contextValue: createFakeContext({session: {userId: user.id}})
    })

    // Sort tags here to make sure that arrays are deep equal
    // because TypeORM may persist them in a wrong order
    t.deepEqual(
      (actual.tags! as any as Tag[]).map(({name}) => name).sort(),

      expected.sort()
    )
  }
)

test<Macro>(
  "storyAdd has isDraft field set to true by default",

  withDatabase,

  async t => {
    const [{title, description}] = createFakeStories(1)
    const {user} = t.context

    const {
      storyAdd: actual
    } = await graphql<StoryAddResult, StoryAddVariables>({
      source: storyAdd,
      variableValues: {story: {title, description}},
      contextValue: createFakeContext({session: {userId: user.id}})
    })

    t.true(actual.isDraft)
  }
)

test(
  "storyAdd has isFinished field set to false by default",

  withDatabase,

  async t => {
    const [{title, description}] = createFakeStories(1)
    const {user} = t.context

    const {
      storyAdd: actual
    } = await graphql<StoryAddResult, StoryAddVariables>({
      source: storyAdd,
      variableValues: {story: {title, description}},
      contextValue: createFakeContext({session: {userId: user.id}})
    })

    t.false(actual.isFinished)
  }
)

test(
  "storyUpdate allows to update title of the story",

  withDatabase,

  async t => {
    const expected = faker.lorem.words(3)

    const {user, db} = t.context

    const [story] = createFakeStories(1)

    story.publisher = user

    await db.em.getRepository(Story).persistAndFlush(story)

    const {
      storyUpdate: actual
    } = await graphql<StoryUpdateResult, StoryUpdateVariables>({
      source: storyUpdate,
      variableValues: {story: {id: story.id, title: expected}},
      contextValue: createFakeContext({session: {userId: user.id}})
    })

    t.is(actual.title, expected)
  }
)

test<Macro>(
  "storyUpdate allows to update description of the story",

  withDatabase,

  async t => {
    const expected = faker.lorem.paragraph()

    const {user, db} = t.context

    const [story] = createFakeStories(1)

    story.publisher = user

    await db.em.getRepository(Story).persistAndFlush(story)

    const {
      storyUpdate: actual
    } = await graphql<StoryUpdateResult, StoryUpdateVariables>({
      source: storyUpdate,
      variableValues: {story: {id: story.id, description: expected}},
      contextValue: createFakeContext({session: {userId: user.id}})
    })

    t.is(actual.description, expected)
  }
)

test(
  "storyUpdate resets tags when the tags argument is null",

  withDatabase,

  async t => {
    const {user, db} = t.context

    const [story] = createFakeStories(1)

    const tags = [
      "Sweetie Belle",
      "Scootaloo",
      "Apple Bloom",
      "Adventure"
    ].map<Tag>(name => new Tag(name))

    story.publisher = user
    story.tags.set(tags)

    await db.em.getRepository(Story).persistAndFlush(story)

    const {
      storyUpdate: actual
    } = await graphql<StoryUpdateResult, StoryUpdateVariables>({
      source: storyUpdate,
      variableValues: {story: {id: story.id, tags: null}},
      contextValue: createFakeContext({session: {userId: user.id}})
    })

    t.deepEqual((actual.tags as any as Tag[]), [])
  }
)

test<Macro>("storyUpdate allows to update tags", withDatabase, async t => {
  const expected = ["Big Macintosh", "Sugar Belle", "Romance"]

  const {user, db} = t.context

  const [story] = createFakeStories(1)

  const tags = [
    "Big Macintosh",
    "Marble Pie",
    "Romance"
  ].map<Tag>(name => new Tag(name))

  story.publisher = user
  story.tags.set(tags)

  await db.em.getRepository(Story).persistAndFlush(story)

  const {
    storyUpdate: actual
  } = await graphql<StoryUpdateResult, StoryUpdateVariables>({
    source: storyUpdate,
    variableValues: {story: {id: story.id, tags: expected}},
    contextValue: createFakeContext({session: {userId: user.id}})
  })

  t.deepEqual(
    (actual.tags! as any as Tag[]).map(({name}) => name).sort(),

    expected.sort()
  )
})

test<Macro>(
  "storyUpdate will not update isFinished field when there's no chapters",

  withDatabase,

  async t => {
    const {user, db} = t.context

    const [story] = createFakeStories(1)

    story.publisher = user
    story.isFinished = false

    await db.em.getRepository(Story).persistAndFlush(story)

    const {
      storyUpdate: actual
    } = await graphql<StoryUpdateResult, StoryUpdateVariables>({
      source: storyUpdate,
      variableValues: {story: {id: story.id, isFinished: true}},
      contextValue: createFakeContext({session: {userId: user.id}})
    })

    t.false(actual.isFinished)
  }
)

test<Macro>(
  "storyUpdate will update isFinished field when there's story has chapters",

  withDatabase,

  async t => {
    const {user, db} = t.context

    const [story] = createFakeStories(1)
    const [chapter] = createFakeChapters(1)

    story.publisher = user
    story.isFinished = false
    story.chaptersCount = 1

    chapter.story = story
    chapter.number = 1

    await db.em.getRepository(Story).persistAndFlush(story)
    await db.em.getRepository(Chapter).persistAndFlush(chapter)

    const {
      storyUpdate: actual
    } = await graphql<StoryUpdateResult, StoryUpdateVariables>({
      source: storyUpdate,
      variableValues: {story: {id: story.id, isFinished: true}},
      contextValue: createFakeContext({session: {userId: user.id}})
    })

    t.true(actual.isFinished)
  }
)

test<Macro>(
  "storyUpdate throws an error when given story doesn't exists",

  withDatabase,

  async t => {
    const {user} = t.context

    const trap = () => graphql<never, StoryUpdateVariables>({
      source: storyUpdate,
      variableValues: {story: {id: 420, description: "Not goanna happen."}},
      contextValue: createFakeContext({session: {userId: user.id}})
    })

    const {graphQLErrors} = await t.throwsAsync<OperationError>(trap)
    const [{originalError}] = graphQLErrors

    t.is((originalError as HttpError).statusCode, 400)
  }
)

test<Macro>("storyRemove removes given story", withDatabase, async t => {
  const {user, db} = t.context

  const [story] = createFakeStories(1)

  story.publisher = user

  await db.em.getRepository(Story).persistAndFlush(story)

  const {
    storyRemove: actual
  } = await graphql<StoryRemoveResult, StoryRemoveVariables>({
    source: storyRemove,
    variableValues: {storyId: story.id},
    contextValue: createFakeContext({session: {userId: user.id}})
  })

  t.is(Number(actual), story.id)
})

test<Macro>(
  "storyRemove throws an error when given story doesn't exists",

  withDatabase,

  async t => {
    const {user} = t.context

    const trap = () => graphql<never, StoryRemoveVariables>({
      source: storyRemove,
      variableValues: {storyId: 420},
      contextValue: createFakeContext({session: {userId: user.id}})
    })

    const {graphQLErrors} = await t.throwsAsync<OperationError>(trap)
    const [{originalError}] = graphQLErrors

    t.is((originalError as HttpError).statusCode, 400)
  }
)

test.after.always(async () => {
  await cleanupConnection()
})
