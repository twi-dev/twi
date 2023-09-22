import {describe, expect} from "vitest"

import {faker} from "@faker-js/faker"

import {File} from "../../../db/entities.js"

import {trpcTest} from "../../../__fixtures__/trpc.js"
import {authContext} from "../../../__context__/authContext.js"

import {getFileIdFromUrl} from "../../../lib/uploads/utils/getFileIdFromUrl.js"

describe("user.update procedure", async () => {
  authContext()

  trpcTest("updates displayName", async ({trpc}) => {
    const expected = faker.person.fullName()
    const actual = await trpc.user.update({displayName: expected})

    expect(actual.displayName).toEqual(expected)
  })

  trpcTest("unsets displatName on null value", async ({trpc, orm, auth}) => {
    const displatName = faker.person.fullName()

    auth!.displayName = displatName

    await orm.em.flush()

    expect(auth?.displayName).not.toBeNull()

    const actual = await trpc.user.update({displayName: null})

    expect(actual.displayName).toBeNull()
  })

  trpcTest("updates avatar", async ({trpc}) => {
    const expected = getFileIdFromUrl(faker.internet.avatar())
    const actual = await trpc.user.update({avatar: expected})

    expect(actual.avatar?.key).toEqual(expected)
  })

  trpcTest("unsets avatar on null value", async ({trpc, orm, auth}) => {
    const key = getFileIdFromUrl(faker.internet.avatar())
    const file = orm.em.create(File, {key: key as string}, {persist: true})

    auth!.avatar = file

    await orm.em.flush()

    expect(auth!.avatar).toBe(file)

    const actual = await trpc.user.update({avatar: null})

    expect(actual.avatar).toBeNull()
  })
})
