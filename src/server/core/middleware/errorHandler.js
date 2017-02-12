import log from "server/core/log"

const errorHandler = () => async function _errorHandler(ctx, next) {
  try {
    await next()
  } catch (err) {
    log.error(err)
    log.error(err.stack)

    ctx.body = {
      message: err.message || String(err)
    }
  }
}

export default errorHandler
