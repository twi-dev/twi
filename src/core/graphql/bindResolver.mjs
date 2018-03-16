import invariant from "@octetstream/invariant"

import isFunction from "lodash/isFunction"
import isString from "lodash/isString"
import isObject from "lodash/isObject"

import getType from "core/helper/util/getType"

/**
 * Bind given resolver with improved parameters API.
 *
 * @param {function | string} resolver
 * @param {any} [ctx = null]
 *
 * @return {function}
 */
function bindResolver(resolver, ctx = null) {
  if (isString(resolver)) {
    invariant(
      !(isFunction(ctx) || isObject(ctx)), TypeError,
      "Expected an object or function as " +
      "the second argument is resolver name passed." +
      "Received %s", getType(ctx)
    )

    resolver = ctx[resolver]
  }

  invariant(
    !isFunction(resolver), TypeError,
    "Expected a resolver function. Received %s", getType(resolver)
  )

  return function resolverDecorator(parent, args, context, node) {
    parent || (parent = null)
    args || (args = {})
    context || (context = {})
    node || (node = {})

    return resolver.call(ctx, {parent, args, context, ctx: context, node})
  }
}

export default bindResolver
