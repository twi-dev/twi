import {z} from "zod"

import {validateSuffix} from "./utils/validateSuffix.js"
import {validateName} from "./utils/validateName.js"

export const StorySlugObject = z.object({
  date: z.string().nonempty().superRefine(validateSuffix),
  name: z.string().nonempty().superRefine(validateName)
})
