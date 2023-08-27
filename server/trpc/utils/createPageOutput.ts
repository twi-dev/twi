/* eslint-disable indent */

import {z, ZodIssueCode} from "zod"
import type {ZodObject, ZodRawShape, input, output} from "zod"

import {createPageInput, DefaultPageInput} from "./createPageInput.js"
import {Page} from "./Page.js"

/**
 * Creates a `Page<T>` output with the list of items of type `T`
 */
export const createPageOutput = <
  TOutput extends ZodRawShape,
  TInput extends ReturnType<typeof createPageInput>
>(
  output: ZodObject<TOutput>,
  input: TInput
) => z
  .object({
    items: z.array(output),
    count: z.number().int(),
    args: input.transform(({args}) => args)
  })
  .transform(page => new Page(page).toJSON())
  .superRefine((value, ctx) => {
    if (value.current > value.pagesCount) {
      ctx.addIssue({
        code: ZodIssueCode.too_big,
        maximum: value.pagesCount,
        inclusive: true,
        type: "number",
        message: "Page cursor is out of range: "
          + `The value must be less than or equal to ${value.pagesCount}`
      })
    }
  })

export const DefaultPageOutput = createPageOutput(
  z.object({}),

  DefaultPageInput
)

export type IDefaultPageOutput = input<typeof DefaultPageOutput>

export type ODefaultPageOutput = output<typeof DefaultPageOutput>
