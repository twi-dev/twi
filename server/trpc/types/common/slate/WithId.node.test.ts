import {describe, test} from "vitest"

import {v4, validate} from "uuid"
import {isPlainObject} from "lodash-es"

import {WithId, type IWithId} from "./WithId.js"

describe("WithId type", async () => {
  test("creates object with given uuid", async ({expect}) => {
    const expected: IWithId = {
      id: v4()
    }

    const actual = await WithId.parseAsync(expected)

    expect(isPlainObject(actual)).toBe(true)
    expect(actual).toMatchObject(expected)
  })

  test("returns object with default id", async ({expect}) => {
    const actual = await WithId.parseAsync({} satisfies IWithId)

    expect(actual.id).toBeDefined()
    expect(validate(actual.id)).toBe(true)
  })

  test("throws an error on invalid id field", async ({expect}) => {
    const promise = WithId.parseAsync({
      id: "not-uuid"
    } satisfies IWithId)

    await expect(promise).rejects.toThrowError(/Invalid uuid/)
  })
})
