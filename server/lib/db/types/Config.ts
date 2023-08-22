import {z} from "zod"

import {DatabaseName} from "./DatabaseName.js"
import {Password} from "./Password.js"
import {Debug} from "./Debug.js"
import {Host} from "./Host.js"
import {Port} from "./Port.js"
import {User} from "./User.js"

export const Config = z.object({
  dbName: DatabaseName,
  host: Host,
  port: Port,
  user: User,
  password: Password,
  debug: Debug
})

export type IConfig = z.input<typeof Config>

export type OConfig = z.output<typeof Config>
