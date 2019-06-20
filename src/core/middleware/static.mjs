import {join} from "path"

import kserve from "koa-static"

const serve = kserve(join(__dirname, "..", "..", "..", "static"))

export default serve
