import create from "lib/helper/decorator/createDecorator"

/**
 * Applies resolvver's params as a single object for better experience
 *
 * @param {any} [parent = undefined]
 * @param {object} args
 * @param {Koa.Context} context
 * @param {object} node
 *
 * @return {(params: object) => any | Promise<any>}
 */
const normalizeParams = create(fn => (parent, args, ctx, node) => fn({
  parent, args, ctx, node, root: parent, context: ctx, ast: node
}))

export default normalizeParams
