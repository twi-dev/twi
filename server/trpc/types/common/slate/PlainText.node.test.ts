import {describe, test} from "vitest"

import {PlainText, type IPlainText} from "./PlainText.js"

describe("PlainText type", async () => {
  test("parses plain text", async ({expect}) => {
    const expected: IPlainText = {
      text: "Some text"
    }

    const actual = await PlainText.parseAsync(expected)

    expect(actual).toMatchObject(expected)
  })
})
