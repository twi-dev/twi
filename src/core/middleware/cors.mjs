import cors from "@koa/cors"

export default cors({
  origin: "*", // TODO: Add an origin to config
  allowedMethods: [
    "GET",
    "POST"
  ]
})
