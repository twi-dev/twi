import {describe} from "vitest"

import {trpcTest} from "../../../../scripts/tests/context/trpc.js"

import {User} from "../../../db/entities.js"

describe("user.create procedure", async () => {
  trpcTest("creates a user", async ({expect, trpc, orm}) => {
    const actual = await trpc.user.create({
      login: "user1",
      email: "user1@example.com",
      password: "somenotreallystrongpassword"
    })

    const user = await orm.em.findOneOrFail(User, actual.id)

    expect(actual.id).to.be.equal(user.id)
    expect(actual.login).to.be.equal(user.login)
  })
})
