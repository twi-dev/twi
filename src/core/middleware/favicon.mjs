import {join} from "path"

import ms from "ms"
import favicon from "koa-favicon"

const path = join(
  __dirname, "..", "..", "..", "static/asset/img/icns/favicon/twi.ico"
)

export default favicon(path, {maxAge: ms("1d")})
