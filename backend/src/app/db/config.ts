import waterfall from "../../helper/array/waterfall"

import {getConfig} from "./connection"

export default waterfall([
  () => import("../config"),

  () => getConfig()
])
