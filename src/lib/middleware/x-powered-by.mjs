import {version, codename} from "package.json"

function xPoweredBy(ctx, next) {
  ctx.set("X-Powered-By", `Twi API v${version} "${codename}"`)

  return next()
}

export default xPoweredBy
