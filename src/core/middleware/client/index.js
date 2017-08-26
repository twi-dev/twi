import parser from "ua-parser-js"

const client = () => async function(ctx, next) {
  const client = parser(ctx.get("user-agent"))

  ctx.client = client

  await next()
}

export default client
