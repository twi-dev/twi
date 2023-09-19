import {describe, test} from "vitest"

import {CodeText, type ICodeText} from "./CodeText.js"

describe("CodeText type", async () => {
  test("parses text with a code field", async ({expect}) => {
    const expected: ICodeText = {
      text: "some text",
      code: true
    }

    const actual = await CodeText.parseAsync(expected)

    expect(actual).toMatchObject(expected)
  })

  test("thrown an error if input has no code field", async ({expect}) => {
    const promise = CodeText.parseAsync({
      text: "some text"
    } satisfies Pick<ICodeText, "text">)

    await expect(promise).rejects.toThrowError(/Invalid literal value/)
  })
})
