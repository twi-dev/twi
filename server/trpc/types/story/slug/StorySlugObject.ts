import {z} from "zod"

import {validateDate} from "./utils/validateDate.js"
import {validateName} from "./utils/validateName.js"

export const StorySlugObject = z.object({
  date: z.string().nonempty().superRefine(validateDate),
  name: z.string().nonempty().superRefine(validateName)
})
