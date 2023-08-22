import {NodeEnv} from "../../types/common/NodeEnv.js"

export const Debug = NodeEnv.transform(env => env === "development")
