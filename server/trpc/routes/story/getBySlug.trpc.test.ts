import {describe, expect} from "vitest"
import {faker} from "@faker-js/faker"

import {Story, User} from "../../../db/entities.js"
import {trpcTest} from "../../../__fixtures__/trpc.js"

describe("story.getBySlug procedure", async () => {
  trpcTest.concurrent("returns story", async ({trpc, orm}) => {
    const user = orm.em.create(User, {
      login: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    })

    const story = orm.em.create(Story, {
      publisher: user,
      title: faker.lorem.words({min: 2, max: 5}),
      description: [{
        type: "p",
        children: [{
          text: faker.lorem.paragraph()
        }]
      }]
    })

    await orm.em.persistAndFlush([user, story])

    const actual = await trpc.story.getBySlug({slug: story.slug})

    expect(actual.slug).to.equal(story.slug)
  })

  trpcTest.concurrent("throws an error when to story found", async ({
    expect,
    trpc
  }) => {
    const promise = trpc.story.getBySlug({slug: "noop~abcde"})

    await expect(promise).rejects.toThrowError(/NOT_FOUND/)
  })
})
