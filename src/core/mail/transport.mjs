import config from "core/base/config"

import Transport from "./MailTransport"

export default new Transport(config.mail)
