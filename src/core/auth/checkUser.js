import invariant from "@octetstream/invariant"
import isFunction from "lodash/isFunction"
import isString from "lodash/isString"

import concatFromArray from "core/helper/string/concatFromArray"

import Unauthorized from "core/error/http/Unauthorized"

const DEFAULT_MESSAGE = concatFromArray([
  "Seems like you're have not authorized.",
  "Please, check your credentials and try again."
], " ")

const checkUserDecorator = message => resolver => async function(
  parent, args, ctx, ...others
) {
  message || (message = DEFAULT_MESSAGE)

  invariant((!ctx.state.user || !ctx.isAuthenticated()), Unauthorized, message)

  return resolver(parent, args, ctx, ...others)
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

export default checkUser
export {checkUserDecorator}
