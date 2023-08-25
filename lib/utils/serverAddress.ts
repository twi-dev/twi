import {z} from "zod"

import {globalObject} from "./globalObject"

const ServerAddress = z
  .string()
  .url()
  .default("http://localhost:3000") // FIXME: `nuxt prepare` if I remove this. Find proper fix
  .transform(url => new URL(url).origin)

export const serverAddress = ServerAddress.parse(
  process.env.AUTH_ORIGIN || globalObject?.location?.origin
)
