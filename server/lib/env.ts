import {optional, parse} from "valibot"
import {omit} from "lodash-es"
import {loadEnv} from "vite"

import {NodeEnv} from "./types/common/NodeEnv.js"

// @ts-expect-error
process.env.NODE_ENV = parse(
  optional(NodeEnv, "development"),

  process.env.NODE_ENV
)

const envs = omit(
  loadEnv(process.env.NODE_ENV, process.cwd(), ""),

  Object.keys(process.env)
)

process.env = {...process.env, ...envs}
