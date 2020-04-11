import addMilliseconds from "date-fns/addMilliseconds"
import ms from "ms"

import config from "lib/base/config"

import {sign} from "lib/helper/wrapper/jwt"

// TODO: Move JWT tokens to the different thread
const {accessToken, refreshToken} = config.jwt

/**
 * @typedef {Object} AuthRefreshToken
 *
 * @prop {"Bearer"} type
 * @prop {string} payload
 * @prop {Date} signed
 */

/**
 * @typedef {Object} AuthAccessToken
 *
 * @prop {Date} expires
 */

/**
 * @typedef {AuthRefreshToken | AuthRefreshToken & AuthAccessToken} AuthToken
 */

/**
 * @param {string} payload
 *
 * @return {AuthToken}
 */
async function signToken(payload, {secret, expires, ...options}) {
  const signed = Date.now()

  if (expires) {
    options.expiresIn = expires
    expires = addMilliseconds(signed, ms(expires)).getTime()
  }

  return sign({...payload, expires, signed}, secret, options)
    .then(token => ({type: "Bearer", payload: token, signed, expires}))
}

/**
 * @param {string} payload
 */
const signAccessToken = payload => signToken(payload, {
  ...accessToken, expires: "15 minutes"
})

/**
 * @param {string} payload
 */
const signRefreshToken = payload => signToken(payload, {
  ...refreshToken, expires: "1 year"
})

export {signAccessToken, signRefreshToken}
