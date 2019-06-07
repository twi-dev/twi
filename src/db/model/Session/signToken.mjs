import addMilliseconds from "date-fns/addMilliseconds"
import ms from "ms"

import config from "core/base/config"

import {sign} from "core/helper/wrapper/jwt"

const {accessToken, refreshToken} = config.jwt

async function signToken(payload, expires, {secret, ...options}) {
  const signed = Date.now()

  expires = addMilliseconds(signed, ms(expires)).getTime()

  return sign({...payload, expires, signed}, secret, options)
    .then(token => ({type: "Bearer", payload: token, signed, expires}))
}

const signAccessToken = payload => signToken(payload, "15 minutes", accessToken)

const signRefreshToken = payload => signToken(payload, "1 year", refreshToken)

export {signAccessToken, signRefreshToken}
