/**
 * Turn an ES6 class to self-invoking one!
 *
 * @param {Function} Ctor
 * @param {any} ctx
 * @param {any[]} args
 *
 * @return {Function}
 */
const selfInvokingClass = (Ctor, ctx, args) => new Ctor(...args)

export default selfInvokingClass
