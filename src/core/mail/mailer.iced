mailer = require 'nodemailer'
renderer = require './renderer'
i18n = require '../i18n'

{smtp} = require '../helpers/configure-helper'
{info} = require '../logger'

oTransporter = null

createTransport = ->
  if host? and user? and pass?
    return null

  mailer.createTransport
    host: smtp.host
    port: smtp.port
    secure: smtp.secure
    auth:
      user: smtp.user
      pass: smtp.pass

sendPlain = (sTo, sSubject, sText, cb) ->
  unless oTransporter?
    info "Email transporter is not set. Message has not sent."
    return cb null

  await oTransporter.sendMail
    from: "Пони-почтовик <#{smtp.user}>"
    to: sTo
    subject: sSubject
    html: sText,
    defer err, info
  return cb err if err?

  cb null, info

send = (sTo, sSubject, sTemplate, oOptions, cb) ->
  if typeof oOptions is 'function'
    [cb, oOptions] = [oOptions, {}]

  await renderer sTemplate, oOptions,
    defer err, sText
  return cb err if err?

  await sendPlain sTo, sSubject, sText,
    defer err, info
  return err if err?

  cb null, info

module.exports = do ->
  oTransporter ?= do createTransport

  sendPlain: sendPlain
  send: send
