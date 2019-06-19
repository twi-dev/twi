import parser from "ua-parser-js"

function client(ctx, next) {
  const client = parser(ctx.get("user-agent"))

  ctx.state.client = client

  return next()
}

export default client
