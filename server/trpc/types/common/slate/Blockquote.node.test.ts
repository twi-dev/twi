import {describe, test} from "vitest"

import {Blockquote, type IBlockquote} from "./Blockquote.js"

describe("Blockquote type", async () => {
  test("parses valid blockquote input", async ({expect}) => {
    const expected: IBlockquote = {
      type: "blockquote",
      children: [{
        text: "I beat Twilight Sparkle and all I got was this lousy t-shirt"
      }]
    }

    const actual = await Blockquote.parseAsync(expected)

    expect(actual).toMatchObject(expected)
  })

  test("throws an error on invalid type field", async ({expect}) => {
    const promise = Blockquote.parseAsync({
      // @ts-expect-error
      type: "invalid",

      children: [{
        text: "You shall not pass!"
      }]
    } satisfies IBlockquote)

    await expect(promise).rejects.toThrowError(/Invalid literal value/)
  })
})
