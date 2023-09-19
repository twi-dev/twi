import {describe} from "vitest"

import {faker} from "@faker-js/faker"
import {NIL} from "uuid"

import {trpcTest} from "../../../__fixtures__/trpc.js"

import {User} from "../../../db/entities.js"

describe("user.getById procedure", async () => {
  trpcTest("returns a user", async ({expect, trpc, orm}) => {
    const user = orm.em.create(User, {
      email: faker.internet.email(),
      login: faker.internet.userName(),
      password: faker.internet.password()
    })

    await orm.em.persistAndFlush(user)

    const actual = await trpc.user.getById({id: user.id})

    expect(actual.id).toEqual(user.id)
  })

  trpcTest("throws an error when user not found", async ({expect, trpc}) => {
    const promise = trpc.user.getById({id: NIL})

    await expect(promise).rejects.toThrowError(/User not found/)
  })
})
