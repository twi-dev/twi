/**
 * Bind function to specified context
 *
 * @param {any} ctx
 * @param {function} fn
 *
 * @return function
 */
const bind = (ctx, fn) => fn.bind(ctx)

export default bind
