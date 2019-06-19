import kcors from "@koa/cors"

const cors = kcors({
  origin: "*", // TODO: Add an origin to config
  allowedMethods: [
    "GET",
    "POST"
  ]
})

export default cors
