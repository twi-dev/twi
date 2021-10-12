import {readFileSync} from "fs"
import {resolve} from "path"

import {set, pickBy} from "lodash"

import dotenv from "dotenv"

if (!process.env.NODE_ENV) {
  // @ts-ignore
  process.env.NODE_ENV = "development"
}

const dev = process.env.NODE_ENV !== "production"

function loadConfig(name: string): object {
  const path = resolve(name)
  if (dev && process.env.NODE_ENV !== "test") {
    console.log("Load config from %s", path)
  }

  try {
    const config = dotenv.parse(readFileSync(path))

    return pickBy(config, Boolean)
  } catch (error) {
    if ((error as any).code !== "ENOENT") {
      throw error
    }

    return {}
  }
}

function getConfig(): void {
  const config: Record<string, string> = {
    ...loadConfig(".env"),
    ...loadConfig(".env.local"),
    ...loadConfig(`.env.${process.env.NODE_ENV}`),
    ...loadConfig(`.env.${process.env.NODE_ENV}.local`)
  }

  Object.entries(config).forEach(([name, value]) => {
    process.env[name] = value
  })
}

const SERVER_ROOT = resolve(dev ? "src" : "lib")

/* c8 ignore next 1 */
const EXT = dev ? ".ts" : ".js"

set(
  process.env,
  "DATABASE_ENTITIES",
  resolve(SERVER_ROOT, "entity", `*${EXT}`)
)

set(
  process.env,
  "DATABASE_SUBSCRIBERS",
  resolve(SERVER_ROOT, "subscriber", `*Subscriber${EXT}`)
)

set(
  process.env,

  "DATABASE_REPOSITORY",

  resolve(SERVER_ROOT, "repo", `*Repo${EXT}`)
)

set(
  process.env,
  "GRAPHQL_RESOLVERS",
  resolve(SERVER_ROOT, "api", "resolver", `*Resolver${EXT}`)
)

getConfig()
