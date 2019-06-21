import cors from "@koa/cors"

import config from "core/base/config"

export default cors({
  origin: config.cors.origin,
  allowedMethods: [
    "GET",
    "POST"
  ]
})
