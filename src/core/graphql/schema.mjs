import {resolve} from "path"

import buildSchema from "parasprite/buildSchema"

const schema = buildSchema(resolve(__dirname, "..", "..", "api/schema"))

export default schema
