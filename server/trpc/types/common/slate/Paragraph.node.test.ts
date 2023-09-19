import {describe, test} from "vitest"

import {Paragraph, type IParagraph} from "./Paragraph.js"

describe("Paragraph type", async () => {
  test("parses valid input", async ({expect}) => {
    const expected: IParagraph = {
      type: "p",
      children: [{
        text: "Some paragraph"
      }]
    }

    const actual = await Paragraph.parseAsync(expected)

    expect(actual).toMatchObject(expected)
  })

  test("thrown an error for invalid type field", async ({expect}) => {
    const promise = Paragraph.parseAsync({
      // @ts-expect-error
      type: "invalid",

      children: [{
        text: "Invalid paragraph element"
      }]
    } satisfies IParagraph)

    await expect(promise).rejects.toThrowError(/Invalid literal value/)
  })
})
