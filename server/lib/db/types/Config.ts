import type {Input, Output} from "valibot"
import {object} from "valibot"

import {DatabaseName} from "./DatabaseName.js"
import {Password} from "./Password.js"
import {Debug} from "./Debug.js"
import {Host} from "./Host.js"
import {Port} from "./Port.js"
import {User} from "./User.js"

export const Config = object({
  dbName: DatabaseName,
  host: Host,
  port: Port,
  user: User,
  password: Password,
  debug: Debug
})

export type IConfig = Input<typeof Config>

export type OConfig = Output<typeof Config>
