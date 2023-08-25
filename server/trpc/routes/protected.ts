import {z} from "zod"

import {withAuthContext} from "../middlewares/withAuthContext.js"
import {procedure} from "../procedures/base.js"

export const protectedProcedure = procedure
  .use(withAuthContext)
  .output(z.string())
  .query(({ctx: {auth: {user}}}) => user.login)
