import {normal} from "core/log"

async function logger(ctx, next) {
  const {ip, url, method} = ctx

  normal("%s -> %s %s", ip, method, url)

  await next()

  normal("%s <- %d %s %s", ip, ctx.status, method, url)
}

export default logger
