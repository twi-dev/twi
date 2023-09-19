import {describe} from "vitest"

import {trpcTest} from "../../../__fixtures__/trpc.js"

import {User} from "../../../db/entities.js"

describe("user.create procedure", async () => {
  trpcTest("creates a user", async ({expect, trpc, orm}) => {
    const actual = await trpc.user.create({
      login: "user1",
      email: "user1@example.com",
      password: "somenotreallystrongpassword"
    })

    const user = await orm.em.findOneOrFail(User, actual.id)

    expect(actual.id).toEqual(user.id)
    expect(actual.login).toEqual(user.login)
  })
})
