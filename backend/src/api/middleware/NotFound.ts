import {MiddlewareFn} from "type-graphql"
import {Context} from "koa"

/**
 * Throws Not Found error when the next function is resolved with `undefined`.
 * Note that `null` will be bypassed as it is valid JSON value
 */
const NotFound: MiddlewareFn<Context> = async ({context, info}, next) => {
  const result = await next()

  if (result === null) {
    context.throw(404, `Unable to find "${info.fieldName}"`)
  }

  return result
}

export default NotFound
