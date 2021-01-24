/**
 * Bind function to specified context
 *
 * @param {any} ctx
 * @param {Function} fn
 *
 * @return Function
 */
const bind = (ctx, fn) => fn.bind(ctx)

export default bind
