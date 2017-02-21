import {normal} from "server/core/log"

const logger = () => async function logger(ctx , next) {
  const {ip, url, method} = ctx

  normal(`${ip} -> ${method} ${url}`)
  await next()
  normal(`${ip} <- ${ctx.status} ${method} ${url}`)
}

export default logger
