import {resolve} from "path"

import {loadEnvConfig} from "@next/env"
import {set, noop} from "lodash"

const PWD = process.cwd()
const dev = process.env.NODE_ENV !== "production"

loadEnvConfig(PWD, dev, {
  // Silencing annoying logging from @next/env
  /* c8 ignore next */
  info: (process.env.NODE_ENV as string) === "debug" ? console.info : noop,
  error: console.error,
})

const SERVER_ROOT = resolve(process.env.SERVER_ROOT as string)

/* c8 ignore next 3 */
const EXT = process.env.NODE_ENV === "production"
  ? ".js"
  : ".ts"

set(
  process.env,
  "DATABASE_ENTITIES",
  resolve(SERVER_ROOT, "entity", `*${EXT}`)
)

set(
  process.env,
  "DATABASE_SUBSCRIBERS",
  resolve(SERVER_ROOT, "subscriber", `*Subscriber${EXT}`)
);

set(
  process.env,
  "GRAPHQL_RESOLVERS",
  resolve(SERVER_ROOT, "api", "resolver", `*Resolver${EXT}`)
)
