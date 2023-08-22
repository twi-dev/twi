import {withORM} from "../middlewares/withORM.js"
import {trpc} from "../def.js"

export const procedure = trpc.procedure.use(withORM)

export const baseProcedure = procedure
