import {resolve} from "path"

import buildSchema from "parasprite/buildSchema"

const schema = buildSchema(resolve(__dirname, "../../graphql/schema"))

export default schema
