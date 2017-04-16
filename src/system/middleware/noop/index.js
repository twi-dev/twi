const noop = () => async (ctx, next) => await next()

export default noop
