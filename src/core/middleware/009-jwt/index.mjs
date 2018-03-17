import authorize from "koa-jwt"

import config from "core/config"

const configureKoaJwt = () => authorize({
  secret: config.jwt.accessToken.secret,
  cookie: false,
  passthrough: true
})

export default configureKoaJwt
