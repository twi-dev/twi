import {createTransport} from "nodemailer"

import config from "core/base/config"

import {render} from "core/base/view"

const {mail} = config

// Just a small workaround to bring pre-configured "from" option and templates
// into the nodemailer transport which is does not seems to available for any
// 3rd party enhancements. At least I don't see anything about that in docs.
class MailTransport {
  constructor(options) {
    this.__transport = createTransport(options)
  }

  sendMail = params => this.send(params)

  send = params => this.__transport.sendMail({...params, from: mail.from})

  sendHtml = ({path, ...params}) => (
    render(path).then(html => this.send({...params, html}))
  )
}

export default MailTransport
