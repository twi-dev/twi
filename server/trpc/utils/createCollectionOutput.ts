/* eslint-disable @typescript-eslint/indent */
import type {ZodRawShape, ZodObject} from "zod"
import {Collection} from "@mikro-orm/core"
import {z, ZodIssueCode} from "zod"

export const createCollectionOutput = <T extends ZodRawShape>(
  schema: ZodObject<T>
) => z
  .unknown()
  .superRefine(async (value, ctx) => {
    if (!(value instanceof Collection)) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "Input must be a Collection",
      })

      return z.NEVER
    }

    const result = await schema.safeParseAsync(value)

    if (result.success === false) {
      result.error.issues.forEach(issue => {
        ctx.addIssue(issue)
      })
    }

    return z.NEVER
  })
  .transform(value => Array.from(value as Collection<z.output<ZodObject<T>>>))
