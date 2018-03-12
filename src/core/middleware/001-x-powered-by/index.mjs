// eslint-disable-next-line import/no-unresolved
import {version, codename} from "../../../package.json"

const xPoweredBy = () => async function xPoweredByHeader(ctx, next) {
  ctx.set("X-Powered-By", `Twi API v${version} "${codename}"`)

  await next()
}

export default xPoweredBy
