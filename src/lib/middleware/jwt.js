import authorize from "koa-jwt"

import config from "lib/base/config"

export default authorize({
  secret: config.jwt.accessToken.secret,
  cookie: false,
  passthrough: true
})
