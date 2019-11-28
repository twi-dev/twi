import parser from "ua-parser-js"

function client(ctx, next) {
  const agent = parser(ctx.get("user-agent"))

  ctx.state.client = {...agent, ip: ctx.ip}

  return next()
}

export default client
