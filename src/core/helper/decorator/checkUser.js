import invariant from "@octetstream/invariant"
import isFunction from "lodash/isFunction"
import isString from "lodash/isString"

import Forbidden from "core/error/http/Forbidden"

const DEFAULT_MESSAGE = "Access denied."

const checkUserDecorator = message => resolver => async function(
  parent, args, ctx, ...others
) {
  message || (message = DEFAULT_MESSAGE)

  invariant((!ctx.state.user || !ctx.isAuthenticated()), Forbidden, message)

  return await resolver(parent, args, ctx, ...others)
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
