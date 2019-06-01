import {createTransport} from "nodemailer"

import config from "core/base/config"

const transport = createTransport(config.mail)

export default transport
