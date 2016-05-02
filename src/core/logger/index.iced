'use strict'

colors = require 'colors'
moment = require 'moment'

LOG_NORMAL = 0
LOG_OK = 1
LOG_INFO = 2
LOG_WARN = 3
LOG_ERR = 4

LOG_LEVELS = [
  "log"
  "ok".green
  "info".cyan
  "warn".yellow
  "err".red
]

write = (sString) -> process.stdout.write sString

writeErr = (sErrString) -> process.stderr.write sErrString

logLine = (sMessage, iLevel = 0) ->
  i18n = require '../i18n'

  moment.locale do i18n.getLang().toLowerCase
  now = moment().format i18n.t 'ponyfiction.datetimeFormat'
  suffix = i18n.t 'ponyfiction.logSuffix',
    format: now

  if iLevel in [LOG_NORMAL, LOG_OK, LOG_INFO]
    write "[#{LOG_LEVELS[iLevel]}]
      #{i18n.t 'ponyfiction.process'}
      ##{process.pid}:
      #{sMessage}
      #{suffix}
    \n"
  else
    writeErr "[#{LOG_LEVELS[iLevel]}]
      #{i18n.t 'ponyfiction.process'}
      ##{process.pid}:
      #{sMessage}
      #{suffix}
    \n"

# Alternate logger calls
normal = (sMessage) -> logLine sMessage, LOG_NORMAL

ok = (sMessage) -> logLine sMessage, LOG_OK

info = (sMessage) -> logLine sMessage, LOG_INFO

warn = (sMessage) -> logLine sMessage, LOG_WARN

err = (sMessage) -> logLine sMessage, LOG_ERR

# Logger middleware
module.exports = (req, res, next) ->
  logLine "#{req.method} #{req.url}"
  do next

# Logger methods
module.exports.logLine = logLine
module.exports.LOG_NORMAL = LOG_NORMAL
module.exports.LOG_OK = LOG_OK
module.exports.LOG_INFO = LOG_INFO
module.exports.LOG_WARN = LOG_WARN
module.exports.LOG_ERR = LOG_ERR
module.exports.normal = normal
module.exports.ok = ok
module.exports.info = info
module.exports.warn = warn
module.exports.err = err