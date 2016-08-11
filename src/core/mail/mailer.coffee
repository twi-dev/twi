mailer = require 'nodemailer'
renderer = require './renderer'
i18n = require '../i18n'

{smtp} = require '../helpers/configure-helper'
{info} = require '../logger'

oTransporter = null

createTransport = ->
  unless smtp.host? and smtp.user? and smtp.pass?
    return null

  mailer.createTransport
    host: smtp.host
    port: smtp.port
    secure: smtp.secure
    auth:
      user: smtp.user
      pass: smtp.pass

###
# Send an email to given address
#
# @param to
###
sendPlain = (to, subject, text) ->
  unless oTransporter?
    info "Email transporter is not set. Message has not sent."
    return

  await oTransporter.sendMail
    from: "Пони-почтовик <#{smtp.user}>"
    to: to
    subject: subject
    html: text

send = (to, subject, templateName, options = {}) ->
  await sendPlain to, subject,
    await renderer templateName, options

module.exports = do ->
  oTransporter ?= do createTransport

  sendPlain: sendPlain
  send: send
