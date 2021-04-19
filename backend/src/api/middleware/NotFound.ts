import {MiddlewareFn} from "type-graphql"
import {Context} from "koa"

/**
 * Throws Not Found error when the next function is resolved with an empty value
 */
const NotFound: MiddlewareFn<Context> = async ({context, info}, next) => {
  const result = await next()

  if (!result) {
    context.throw(404, `Unable to find "${info.fieldName}"`)
  }

  return result
}

export default NotFound
