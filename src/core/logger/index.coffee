'use strict'

colors = require 'colors'
moment = require 'moment'

write = (message) -> process.stdout.write "#{message}\n"

writeErr = (message) -> process.stderr.write "#{message}\n"

###
# Logging levels
###
LOG_NORMAL = 0
LOG_OK = 1
LOG_INFO = 2
LOG_WARN = 3
LOG_ERR = 4

###
# Labels
###
LOG_LABELS = [
  "log"
  "ok".green
  "info".cyan
  "warn".yellow
  "err".red
]

log = (message, iLevel = 0) ->
  now = (do moment).format 'DD MMM YYYY h:mm:ss a'
  if iLevel in [LOG_NORMAL, LOG_OK, LOG_INFO]
    write "[#{LOG_LABELS[[iLevel]]}] #{message} at #{now}"
  else
    writeErr "[#{LOG_LABELS[[iLevel]]}] #{message} at #{now}"

normal = (message) -> log message, LOG_NORMAL

ok = (message) -> log message, LOG_OK

info = (message) -> log message, LOG_INFO

warn = (message) -> log message, LOG_WARN

err = (message) -> log message, LOG_ERR

module.exports = log
module.exports.log = log
module.exports.normal = normal
module.exports.ok = ok
module.exports.info = info
module.exports.warn = warn
module.exports.err = err
