thunk = require 'thunkify'
co = require 'co'
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

# TODO: Rewrite this function using generators or thunk
sendPlain = (sTo, sSubject, sText) ->
  unless oTransporter?
    info "Email transporter is not set. Message has not sent."
    return

  yield oTransporter.sendMail
    from: "Пони-почтовик <#{smtp.user}>"
    to: sTo
    subject: sSubject
    html: sText

send = (sTo, sSubject, sTemplateName, oOptions = {}) ->
  yield sendPlain sTo, sSubject,
    yield renderer sTemplateName, oOptions

module.exports = do ->
  oTransporter ?= do createTransport

  sendPlain: sendPlain
  send: send
