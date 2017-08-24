import {normal} from "core/log"

const logger = () => async function(ctx, next) {
  const {ip, url, method} = ctx

  // normal(`${ip} -> ${method} ${url}`)

  normal("%s -> %s %s", ip, method, url)
  await next()
  normal("%s <- %d %s %s", ip, ctx.status, method, url)
  // normal(`${ip} <- ${ctx.status} ${method} ${url}`)
}

export default logger
