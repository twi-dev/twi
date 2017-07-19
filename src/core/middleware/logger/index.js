import {normal} from "core/log"

const logger = () => async function(ctx, next) {
  const {ip, url, method} = ctx

  normal(`${ip} -> ${method} ${url}`)
  await next()
  normal(`${ip} <- ${ctx.status} ${method} ${url}`)
}

export default logger
