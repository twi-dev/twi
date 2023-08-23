import {z} from "zod"

import {validateDate} from "./utils/validateDate.js"
import {validateName} from "./utils/validateName.js"

export const StorySlugTuple = z.tuple([
  z.string().nonempty().superRefine(validateDate),
  z.string().nonempty().superRefine(validateName)
])
