import {router} from "../def.js"

import {getById} from "./user/getById.js"
import {create} from "./user/create.js"
import {update} from "./user/update.js"

export const user = router({
  getById,

  create,
  update
})
