import {describe, beforeAll, afterAll} from "vitest"
import {faker} from "@faker-js/faker"
import {z} from "zod"

import {trpcTest} from "../../../../scripts/tests/context/trpc.js"
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
      title: faker.lorem.words({min: 3, max: 6}),
      description: faker.lorem.paragraph(),
      publisher: user,
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

  trpcTest("returns a list when called w/o arguments", async ({
    trpc,
    expect,
    orm
  }) => {
    const page = await trpc.stories.list()

    const stories = await orm.em.find(Story, {}, {orderBy: {createdAt: "desc"}})
    const expected = await z.array(StoryBaseOutput).parseAsync(stories)

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

  trpcTest("has next page", async ({trpc, expect}) => {
    const page = await trpc.stories.list({limit: count / 2})

    expect(page.current).to.be.equal(1)
    expect(page.nextCursor).to.be.equal(2)
  })

  trpcTest("has prev page", async ({trpc, expect}) => {
    const page = await trpc.stories.list({limit: count / 2, cursor: 2})

    expect(page.current).to.be.equal(2)
    expect(page.prevCursor).to.be.equal(1)
  })
})
