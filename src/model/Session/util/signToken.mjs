import addMilliseconds from "date-fns/addMilliseconds"
import ms from "ms"

import config from "core/base/config"

import {sign} from "core/helper/wrapper/jwt"

// TOGO: Move JWT tokens to the different thread
const {accessToken, refreshToken} = config.jwt

async function signToken(payload, {secret, expires, ...options}) {
  const signed = Date.now()

  if (expires) {
    options.expiresIn = expires
    expires = addMilliseconds(signed, ms(expires)).getTime()
  }

  return sign({...payload, expires, signed}, secret, options)
    .then(token => ({type: "Bearer", payload: token, signed, expires}))
}

const signAccessToken = payload => signToken(payload, {
  ...accessToken, expires: "15 minutes"
})

const signRefreshToken = payload => signToken(payload, {
  ...refreshToken, expires: "1 year"
})

export {signAccessToken, signRefreshToken}
