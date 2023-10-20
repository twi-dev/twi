import {transform} from "valibot"

import {NodeEnv} from "../../types/common/NodeEnv.js"

export const Debug = transform(NodeEnv, env => env === "development")
