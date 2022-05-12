import {readFileSync} from "fs"
import {resolve} from "path"

import {pickBy} from "lodash"

import dotenv from "dotenv"

import type {PickRequiredKeys} from "helper/type/PickRequiredKeys"

if (!process.env.NODE_ENV) {
  // @ts-ignore
  process.env.NODE_ENV = "development"
}

const dev = process.env.NODE_ENV !== "production"

// eslint-disable-next-line no-undef
type RequiredKeys = PickRequiredKeys<NodeJS.ProcessEnv>

const REQUIRED_KEYS: RequiredKeys[] = [
  "DATABASE_HOST",
  "DATABASE_NAME",
  "DATABASE_PASSWORD",
  "DATABASE_PORT",
  "DATABASE_PORT",
  "SERVER_AUTH_SESSION_SECRET"
]

function assertRequiredVariable(name: string, value?: string): void | never {
  // I don't care about type mismatching here, so just cast REQUIRED to string[]
  if ((REQUIRED_KEYS as string[]).includes(name) && !value) {
    throw new Error(
      `Environment variable ${name} is required, but not provided.`
    )
  }
}

function loadConfig(name: string): Record<string, string> {
  try {
    const path = resolve(name)
    const config = dotenv.parse(readFileSync(path))

    if (dev && process.env.NODE_ENV !== "test") {
      console.log("Load config from %s", path)
    }

    return pickBy(config, Boolean)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error
    }

    return {}
  }
}

const config: Record<string, string> = {
  ...loadConfig(".env"),
  ...loadConfig(".env.local"),
  ...loadConfig(`.env.${process.env.NODE_ENV}`),
  ...loadConfig(`.env.${process.env.NODE_ENV}.local`)
}

Object.entries(config).forEach(([name, value]) => {
  assertRequiredVariable(name, value)

  process.env[name] = value
})
