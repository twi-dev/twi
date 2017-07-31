import {version, codename} from "../../../package.json"

const xPoweredBy = () => async function(ctx, next) {
  ctx.set("X-Powered-By", `Twi API v${version} "${codename}"`)

  await next()
}

export default xPoweredBy
