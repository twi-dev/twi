import {router} from "../def.js"

import {getBySlug} from "./story/getBySlug.js"
import {create} from "./story/create.js"

export const story = router({
  getBySlug,
  create
})
