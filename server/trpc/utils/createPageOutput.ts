import type {ObjectSchema, ObjectEntries, Input, Output} from "valibot"
import {number, integer, object, array, transform} from "valibot"

import {Page} from "./Page.js"

import {createPageInput, DefaultPageInput} from "./createPageInput.js"

export function createPageOutput<
  TOutput extends ObjectEntries,
  TInput extends ReturnType<typeof createPageInput>
>(
  output: ObjectSchema<TOutput>,
  input: TInput
) {
  const PageOutputSchema = object({
    items: array(output),
    count: number([integer()]),
    args: transform(input, ({args}) => args)
  })

  const PageOutput = transform(
    PageOutputSchema,

    // TODO: File an issue to valibot
    // @ts-expect-error WithQuestionMarks utility breaks type
    page => new Page(page).toJSON()
  )

  return object(PageOutput.entries)
}

export const DefaultPageOutput = createPageOutput(
  object({}),

  DefaultPageInput
)

export type IDefaultPageOutput = Input<typeof DefaultPageOutput>

export type ODefaultPageOutput = Output<typeof DefaultPageOutput>
