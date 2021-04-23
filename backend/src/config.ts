import {resolve} from "path"

import {loadEnvConfig} from "@next/env"
import {set} from "lodash"

loadEnvConfig(process.cwd(), process.env.NODE_ENV != "production")

const SERVER_ROOT = resolve(process.env.SERVER_ROOT as string)

const FILES_SEARCH_PATTERN = process.env.NODE_ENV === "production"
  ? "*.js"
  : "*.ts"

set(
  process.env,
  "DATABASE_ENTITIES",
  resolve(SERVER_ROOT, "entity", FILES_SEARCH_PATTERN)
)

set(
  process.env,
  "DATABASE_SUBSCRIBERS",
  resolve(SERVER_ROOT, "subscriber", FILES_SEARCH_PATTERN)
);

set(
  process.env,
  "GRAPHQL_RESOLVERS",
  resolve(SERVER_ROOT, "api", "resolver", FILES_SEARCH_PATTERN)
)
