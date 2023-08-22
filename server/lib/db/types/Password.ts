import {z} from "zod"

export const Password = z
  .string()
  .nonempty()
  .optional()
  .superRefine((value, ctx): value is string => {
    if (process.env.NODE_ENV !== "test" && value == null) {
      ctx.addIssue({
        code: "invalid_type",
        expected: "string",
        received: "undefined",
        message: "Password is required for connection user"
      })
    }

    return z.NEVER
  })
