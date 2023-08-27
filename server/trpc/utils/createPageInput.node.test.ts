import {describe} from "vitest"
import {z} from "zod"

import {createPageInput} from "./createPageInput.js"

describe("createPageInput utility", async test => {
  test("throws error when cursor < 1", async ({expect}) => {
    const PageInput = createPageInput()

    const promise = PageInput.parseAsync({
      cursor: 0
    } as z.input<typeof PageInput>)

    await expect(promise)
      .rejects
      .toThrow("Page cursor must be greater than or equal to 1")
  })
})
