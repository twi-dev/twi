import invariant from "@octetstream/invariant"
import isFunction from "lodash/isFunction"
import isString from "lodash/isString"
import isEmpty from "lodash/isEmpty"

import concat from "lib/helper/string/concatWords"

import Unauthorized from "lib/error/http/Unauthorized"

const DEFAULT_MESSAGE = concat(
  "Seems like you're have not authorized.",
  "Please, check your credentials and try again."
)

const checkUserDecorator = message => resolver => async params => {
  message || (message = DEFAULT_MESSAGE)

  const {user} = params.ctx.state

  if (isEmpty(user) || !params.ctx.get("authorization")) {
    throw new Unauthorized(message)
  }

  return resolver(params)
}

/**
 * Check if user is authenticated.
 *
 * @param {string|function}
 *
 * @return {AsyncFunction|function}
 */
function checkUser(messageOrTarget) {
  if (messageOrTarget && isString(messageOrTarget)) {
    return checkUserDecorator(messageOrTarget)
  }

  invariant(
    !isFunction(messageOrTarget), TypeError,
    "Target function is required."
  )

  return checkUserDecorator()(messageOrTarget)
}

export {checkUser as default, checkUserDecorator}
