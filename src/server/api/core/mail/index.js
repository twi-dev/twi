import {join} from "path"

import {createTransport} from "nodemailer"

import {render} from "server/api/core/base/view"

const MAIL_VIEWS = join(process.cwd(), "view", "mail")

let transporter = null

const sendPlain = async (to, subject, content, options) => {
  const message = {to, subject}

  message.from = `${options.mail.from} <${options.mail.auth.user}>`

  const type = options.html === true ? "text" : "html"

  return await transporter.sendMail({
    ...message, [type]: content
  })
}

const send = async (to, subject, filename, locals, options) => await sendPlain(
  to, subject, await render(join(MAIL_VIEWS, filename), locals), {
    ...options, html: true
  }
)

const createMailerService = options => {
  if (!transporter) {
    transporter = createTransport(options.mail)
  }

  const wrapSender = sender => (to, subject, htmlOrFilename, locals) => {
    const args = [to, subject, htmlOrFilename]

    locals && args.push(locals)

    return sender(...args, {
      ...options
    })
  }

  return Object.freeze({
    sendPlain: wrapSender(sendPlain),
    send: wrapSender(send)
  })
}

export default createMailerService
