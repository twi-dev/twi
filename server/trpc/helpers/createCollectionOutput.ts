/* eslint-disable @typescript-eslint/indent */
import type {ZodRawShape, ZodObject} from "zod"
import {Collection} from "@mikro-orm/core"
import {z, ZodIssueCode} from "zod"

// FIXME: Find a way to improve collections validation with Zod
export const createCollectionOutput = <T extends ZodRawShape>(
  schema: ZodObject<T>
) => z
  .unknown()
  .superRefine((value, ctx): value is Collection<z.output<ZodObject<T>>> => {
    if (!(value instanceof Collection)) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "Input must be a Collection",
      })

      return z.NEVER
    }

    const result = schema.safeParse(value)

    if (result.success === false) {
      result.error.issues.forEach(issue => {
        ctx.addIssue(issue)
      })
    }

    return z.NEVER
  })
  .transform(arg => Array.from(arg))
