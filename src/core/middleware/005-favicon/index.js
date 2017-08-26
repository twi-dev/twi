import {join} from "path"

import favicon from "koa-favicon"

// TODO: Rewrite this middleware from scratch because of synchronous favicon
//   reading.
const FAVICON_PATH = join(
  process.cwd(), "static/assets/img/icns/favicon/twi.ico"
)

const configureFavicon = () => favicon(FAVICON_PATH)

export default configureFavicon
