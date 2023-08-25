import {z} from "zod"

import {globalObject} from "./globalObject"

const ServerAddress = z.string().url().transform(url => new URL(url).origin)

export const serverAddress = ServerAddress.parse(
  process.env.AUTH_ORIGIN || globalObject?.location?.origin
)
