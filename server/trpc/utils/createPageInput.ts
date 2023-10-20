import {
  number,
  string,
  object,
  union,
  integer,
  regex,
  nullish,
  minValue,
  maxValue,
  transform,
  optional
} from "valibot"
import type {Pipe, Input, Output} from "valibot"

import type {MaybeNull} from "../../../lib/utils/types/MaybeNull.js"

import {PageArgs} from "./PageArgs.js"

export interface CreatePageInputOptions {
  maxLimit?: MaybeNull<number>
}

const defaults: Required<CreatePageInputOptions> = {
  maxLimit: null
}

const isMaxLimitWithinRange = (
  value: MaybeNull<number>
): value is number => !!value && value > 1 && value <= Number.MAX_SAFE_INTEGER

export function createPageInput(
  options?: CreatePageInputOptions
) {
  const {maxLimit} = {...defaults, ...options}

  const Cursor = transform(
    nullish(
      union([
        number([integer(), minValue(1)]),
        transform(string([regex(/^[1-9][0-9]*$/)]), Number)
      ])
    ),

    value => value ?? undefined
  )

  const limitPipe: Pipe<number> = [integer(), minValue(1)]

  if (isMaxLimitWithinRange(maxLimit)) {
    limitPipe.push(maxValue(maxLimit))
  }

  const Limit = optional(number(limitPipe), maxLimit ?? undefined)

  const PageInput = object({cursor: Cursor, limit: Limit})

  return optional(
    transform(PageInput, ({cursor, limit}) => {
      const args = new PageArgs({cursor, limit, maxLimit})

      return {args}
    }),

    {}
  )
}

export const DefaultPageInput = createPageInput({maxLimit: 50})

export type IDefaultPageInput = Input<typeof DefaultPageInput>

export type ODefaultPageInput = Output<typeof DefaultPageInput>
