import {join} from "path"

import ms from "ms"
import kfavicon from "koa-favicon"

const path = join(
  __dirname, "..", "..", "..", "static/assets/img/icns/favicon/twi.ico"
)

const favicon = kfavicon(path, {
  maxAge: ms("1d")
})

export default favicon
