import cors from "@koa/cors"

import config from "lib/base/config"

export default cors({
  origin: config.cors.origin,
  allowedMethods: [
    "GET",
    "POST"
  ]
})
