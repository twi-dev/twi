import addMilliseconds from "date-fns/addMilliseconds"
import ms from "ms"

import config from "core/base/config"

import {sign} from "core/helper/wrapper/jwt"

const {accessToken, refreshToken} = config.jwt

async function signToken(payload, {secret, expires, ...options}) {
  const signed = Date.now()

  if (expires) {
    expires = addMilliseconds(signed, ms(expires)).getTime()
    options.expiresIn = expires
  }

  return sign({...payload, expires, signed}, secret, options)
    .then(token => ({type: "Bearer", payload: token, signed, expires}))
}

const signAccessToken = payload => signToken(payload, {
  ...accessToken, expires: "15 minutes"
})

const signRefreshToken = payload => signToken(payload, refreshToken)

export {signAccessToken, signRefreshToken}
