import {join} from "path"

import serve from "koa-static"

// TODO: Make configurable
const confugureStatic = () => serve(join(process.cwd(), "static"))

export default confugureStatic
