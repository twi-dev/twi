import create from "core/helper/decorator/createDecorator"

/**
 * @param {object | array} [parent = undefined]
 * @param {object} args
 * @param {Koa.Context} context
 * @param {object} node
 *
 * @return {Promise<any>}
 */
const normalizeParams = create(fn => (parent, args, context, node) => fn({
  parent, root: parent, args, context, ctx: context, node, ast: node
}))

export default normalizeParams
