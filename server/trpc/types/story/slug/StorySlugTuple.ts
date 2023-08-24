import {z} from "zod"

import {validateSuffix} from "./utils/validateSuffix.js"
import {validateName} from "./utils/validateName.js"

export const StorySlugTuple = z.tuple([
  z.string().nonempty().superRefine(validateSuffix),
  z.string().nonempty().superRefine(validateName)
])
