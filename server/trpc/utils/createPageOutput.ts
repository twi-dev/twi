/* eslint-disable indent */

import type {ObjectSchema, ObjectShape, Input, Output} from "valibot"
import {number, integer, object, array, transform} from "valibot"

import {Page} from "./Page.js"

import {createPageInput, DefaultPageInput} from "./createPageInput.js"

export const createPageOutput = <
  TOutput extends ObjectShape,
  TInput extends ReturnType<typeof createPageInput>
>(
  output: ObjectSchema<TOutput>,
  input: TInput
) => transform(
  object({
    items: array(output),
    count: number([integer()]),
    args: transform(input, ({args}) => args)
  }),

  page => new Page(page).toJSON()
)

export const DefaultPageOutput = createPageOutput(
  object({}),

  DefaultPageInput
)

export type IDefaultPageOutput = Input<typeof DefaultPageOutput>

export type ODefaultPageOutput = Output<typeof DefaultPageOutput>
