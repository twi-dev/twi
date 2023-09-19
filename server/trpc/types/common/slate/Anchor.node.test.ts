import {describe, test} from "vitest"

import {Anchor, type IAnchor} from "./Anchor.js"

describe("Anchor type", async () => {
  test("parses anchor with given params", async ({expect}) => {
    const expected: IAnchor = {
      type: "a",
      url: "https://exanple.com",
      children: [{
        text: "Example link"
      }]
    }

    const actual = await Anchor.parseAsync(expected)

    expect(actual).toMatchObject(expected)
  })

  test("thrown an error on invalid type field", async ({expect}) => {
    const promise = Anchor.parseAsync({
      // @ts-expect-error
      type: "invalid-type",

      url: "https://example.com",
      children: [{
        text: "Example link"
      }]
    } satisfies IAnchor)

    await expect(promise).rejects.toThrowError(/Invalid literal value/)
  })

  test("throws an error on invalid url", async ({expect}) => {
    const promise = Anchor.parseAsync({
      type: "a",
      url: "invalid",
      children: [{
        text: "Example link"
      }]
    } satisfies IAnchor)

    await expect(promise).rejects.toThrowError(/Invalid url/)
  })
})
