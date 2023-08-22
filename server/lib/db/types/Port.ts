import {z, ZodIssueCode} from "zod"

const PortString = z.string()
  .superRefine((value, ctx) => {
    if (value && /^[0-9]+$/.test(value) === false) {
      ctx.addIssue({
        code: ZodIssueCode.invalid_string,
        validation: "regex"
      })
    }
  })
  .transform(port => port ? parseInt(port, 10) : undefined)

export const Port = z
  .union([PortString, z.number()])
  .default(3306)
