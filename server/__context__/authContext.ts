import {beforeEach, afterEach} from "vitest"
import {faker} from "@faker-js/faker"

import {UserStatuses} from "../trpc/types/user/UserStatuses.js"
import {runIsolatied} from "../lib/db/orm.js"
import {User} from "../db/entities.js"

export interface AuthContext {
  auth?: User
}

export function authContext() {
  beforeEach<AuthContext>(async ctx => runIsolatied(async em => {
    const user = em.create(User, {
      login: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      status: UserStatuses.Active
    })

    await em.persistAndFlush(user)

    ctx.auth = user
  }))

  afterEach<AuthContext>(async ctx => runIsolatied(async em => {
    if (ctx.auth) {
      await em.remove(ctx.auth).flush()
    }
  }))
}
