import {describe, expect, beforeAll, afterAll} from "vitest"
import {parseAsync, array} from "valibot"
import {faker} from "@faker-js/faker"

import {trpcTest} from "../../../__fixtures__/trpc.js"
import {StoryBaseOutput} from "../../types/story/StoryBaseOutput.js"
import {UserStatuses} from "../../types/user/UserStatuses.js"
import {User, Story} from "../../../db/entities.js"
import {getORM} from "../../../lib/db/orm.js"

describe("stories.list procedure", async () => {
  const count = 100

  beforeAll(async () => {
    const orm = await getORM()
    const em = orm.em.fork()

    const user = em.create(User, {
      login: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      status: UserStatuses.Active
    })

    const createStories = () => em.create(Story, {
      publisher: user,
      title: faker.lorem.words({min: 3, max: 6}),
      description: [{
        type: "p",
        children: [{
          text: faker.lorem.paragraph()
        }]
      }]
    })

    const stories = faker.helpers.multiple(createStories, {count})

    await em.persistAndFlush(stories)

    em.clear()
  })

  afterAll(async () => {
    const orm = await getORM()
    const em = orm.em.fork()

    await em.nativeDelete(Story, {})
    await em.nativeDelete(User, {})
  })

  trpcTest.concurrent("returns a list when called w/o arguments", async ({
    trpc,
    orm
  }) => {
    const page = await trpc.stories.list()

    const stories = await orm.em.find(Story, {}, {orderBy: {createdAt: "desc"}})
    const expected = await parseAsync(array(StoryBaseOutput), stories)

    expect(page.current).to.equal(1)
    expect(page.hasItems).to.equal(true)
    expect(page.itemsCount).to.equal(count)
    expect(page.limit).to.equal(count)
    expect(page.maxLimit).to.equal(count)
    expect(page.pagesCount).to.equal(1)
    expect(page.rowsCount).to.equal(count)
    expect(page.prevCursor).to.toBeNull()
    expect(page.nextCursor).to.toBeNull()
    expect(page.items).to.be.deep.equal(expected)
  })

  trpcTest.concurrent("has next page", async ({trpc, expect}) => {
    const page = await trpc.stories.list({limit: count / 2})

    expect(page.current).to.be.equal(1)
    expect(page.nextCursor).to.be.equal(2)
  })

  trpcTest.concurrent("has prev page", async ({trpc, expect}) => {
    const page = await trpc.stories.list({limit: count / 2, cursor: 2})

    expect(page.current).to.be.equal(2)
    expect(page.prevCursor).to.be.equal(1)
  })
})
