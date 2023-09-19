import {describe, test} from "vitest"

import {EmptyText, type IEmptyText} from "./EmptyText.js"

describe("EmptyText type", async () => {
  test("parses empty text", async ({expect}) => {
    const expected: IEmptyText = {
      text: ""
    }

    const actual = await EmptyText.parseAsync(expected)

    expect(actual).to.toMatchObject(expected)
  })

  test("thrown an error when the text is not empty", async ({expect}) => {
    const promise = EmptyText.parseAsync({
      // @ts-expect-error The error is intended here
      text: "foo"
    } satisfies IEmptyText)

    await expect(promise).rejects.toThrowError(/Invalid literal value/)
  })
})
