import {router} from "../def.js"

import {create} from "./user/create.js"
import {getById} from "./user/getById.js"

export const user = router({
  create,
  getById
})
