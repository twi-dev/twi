import {faker} from "@faker-js/faker"
import {describe} from "vitest"

import {Story} from "../../../db/entities.js"
import {trpcTest} from "../../../__fixtures__/trpc.js"
import {authContext} from "../../../__context__/authContext.js"
import type {IStoryCreateInput} from "../../../trpc/types/story/StoryCreateInput.js"

describe("story.create procedure", async () => {
  authContext()

  trpcTest.concurrent("creates a new story", async ({expect, trpc}) => {
    const expected = {
      title: faker.lorem.words({min: 3, max: 6}),
      description: [{
        type: "p",
        children: [{
          text: faker.lorem.paragraph()
        }]
      }]
    } satisfies IStoryCreateInput

    const actual = await trpc.story.create(expected)

    expect(actual).toMatchObject(expected)
  })

  trpcTest.concurrent("generates slug", async ({expect, trpc, orm}) => {
    const actual = await trpc.story.create({
      title: faker.lorem.words({min: 3, max: 6}),
      description: [{
        type: "p",
        children: [{
          text: faker.lorem.paragraph()
        }]
      }]
    })

    const expected = await orm.em.findOneOrFail(Story, actual.id, {
      fields: ["id", "slug"]
    })

    expect(actual.slug).to.equal(expected.slug)
  })

  trpcTest.concurrent("current user assigned as publisher", async ({
    expect,
    trpc,
    auth
  }) => {
    const {publisher} = await trpc.story.create({
      title: faker.lorem.words({min: 3, max: 6}),
      description: [{
        type: "p",
        children: [{
          text: faker.lorem.paragraph()
        }]
      }]
    })

    expect(publisher.id).to.equal(auth!.id)
  })
})
