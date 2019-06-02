import {createTransport} from "nodemailer"
import {sprintf as fmt} from "sprintf-js"

import config from "core/base/config"

import {render} from "core/base/view"

const {mail} = config

const sender = fmt("%s <%s>", mail.from, mail.user)

// Just a small workaround to bring pre-configured "from" option and templates
// into the nodemailer transport which is does not seems to available for any
// 3rd party enhancements. At least I don't see anything about that in docs.
class Mail {
  constructor(options) {
    this.__transport = createTransport(options)
  }

  send = async ({template, locals, ...params}) => {
    if (template) {
      params.html = await render(template, locals)
    }

    params.from = sender

    return this.__transport.sendMail(params)
  }

  sendMail = params => this.send(params)
}

export default Mail
