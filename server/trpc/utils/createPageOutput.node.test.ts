import {describe} from "vitest"
import {z, ZodError} from "zod"

import {createPageInput} from "./createPageInput.js"
import {createPageOutput} from "./createPageOutput.js"

describe("createPageOutput utility", async test => {
  test("throws error when cursor > pageCount", async ({expect}) => {
    const rows = 100
    const PageOutput = createPageOutput(
      z.object({
        key: z.string()
      }),

      createPageInput({maxLimit: rows})
    )

    const promise = PageOutput.parseAsync({
      items: new Array(rows).fill({key: "some value"}),
      count: rows,
      args: {
        cursor: rows + 1
      }
    } satisfies z.input<typeof PageOutput>)

    await expect(promise).rejects.toThrowError(ZodError)
    await expect(promise).rejects.toThrowError(
      /Page cursor is out of range: The value must be less than or equal to/
    )
  })
})
