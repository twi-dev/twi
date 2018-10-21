import invariant from "@octetstream/invariant"

import isFunction from "lodash/isFunction"

import getType from "core/helper/util/getType"
import waterfall from "core/helper/array/runWaterfall"

import toJS from "./toJS"

/**
 * Bind given resolver with improved parameters API.
 *
 * @param {function | string} resolver
 * @param {any} [ctx = null]
 *
 * @return {function}
 */
function bindResolver(resolver, ctx = null) {
  invariant(
    !isFunction(resolver), TypeError,
    "Expected a resolver function. Received %s", getType(resolver)
  )

  /**
   * @param {object | array} [parent = undefined]
   * @param {object} args
   * @param {Koa.Context} context
   * @param {object} node
   *
   * @return {Promise<any>}
   */
  return function resolverDecorator(parent, args, context, node) {
    parent || (parent = null)
    args || (args = {})
    context || (context = {})
    node || (node = {})

    const params = {parent, args, context, ctx: context, node}

    return waterfall([resolver.bind(ctx || this, params), toJS])
  }
}

export default bindResolver
