import {string, url, optional, transform, parse} from "valibot"

import {globalObject} from "./globalObject"

export const ServerAddress = transform(
  // ! default value is necessary for `nuxt prepare`, otherwise it breaks. I need to find proper fix.
  optional(string([url()]), "http://localhost:3000"),

  url => new URL(url).origin
)

export const serverAddress = parse(
  ServerAddress,

  process.env.AUTH_ORIGIN || globalObject?.location?.origin
)
