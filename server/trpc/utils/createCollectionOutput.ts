/* eslint-disable indent */

import type {ZodRawShape, ZodObject} from "zod"
import {Collection} from "@mikro-orm/core"
import {z, ZodIssueCode} from "zod"
import {isEmpty} from "lodash-es"

export const createCollectionOutput = <T extends ZodRawShape>(
  schema: ZodObject<T>
) => z
  .unknown()
  .superRefine((value, ctx): value is Collection<z.output<ZodObject<T>>> => {
    if (!(value instanceof Collection)) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "Input must be a Collection"
      })

      return z.NEVER
    }

    return z.NEVER
  })
  .transform(value => Array.from(value))
  .superRefine(async (value, ctx) => {
    if (isEmpty(value)) {
      return z.NEVER
    }

    const result = await schema.safeParseAsync(value)
    if (result.success === false) {
      result.error.issues.forEach(issue => {
        ctx.addIssue(issue)
      })
    }
  })
