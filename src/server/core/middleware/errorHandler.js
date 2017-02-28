import log from "server/core/log"

const errorHandler = () => async function _errorHandler(ctx, next) {
  try {
    await next()
  } catch (err) {
    log.error(err.message)
    log.error(err.stack)

    ctx.status = err.status
    ctx.body = {
      message: err.message || String(err)
    }
  }
}

export default errorHandler
