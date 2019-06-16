import config from "core/base/config"

import Transport from "./Mail"

export default new Transport(config.mail)
