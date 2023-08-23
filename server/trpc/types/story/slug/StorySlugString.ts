import {z} from "zod"

import {validateDate} from "./utils/validateDate.js"
import {validateName} from "./utils/validateName.js"

export const StorySlugString = z.string().superRefine((slug, ctx) => {
  const [date, name] = slug.split("/")

  validateDate(date, ctx)
  validateName(name, ctx)
})
