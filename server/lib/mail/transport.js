import config from "lib/base/config"

import Transport from "./Mail"

export default new Transport(config.mail)
