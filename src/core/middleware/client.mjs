import parser from "ua-parser-js"

function client(ctx, next) {
  const client = parser(ctx.get("user-agent"))

  client.id = ctx.ip

  ctx.state.client = client

  return next()
}

export default client
