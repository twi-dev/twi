colors = require 'colors'
moment = require 'moment'

LOG_TRACE = 0
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
  # moment.locale('ru')
  now = moment().format 'DD MMM YYYY hh:mm:ss a'
  if iLevel in [LOG_TRACE, LOG_OK, LOG_INFO]
    write "[#{LOG_LEVELS[iLevel]}] #{sMessage} at #{now}\n"
  else
    writeErr "[#{LOG_LEVELS[iLevel]}] #{sMessage} at #{now}\n"

# Logger middleware
module.exports = (req, res, next) ->
  logLine "#{req.method} #{req.url}"
  do next

# logger methods
module.exports.logLine = logLine
# module.exports.log = log
module.exports.LOG_TRACE = LOG_TRACE
module.exports.LOG_OK = LOG_OK
module.exports.LOG_INFO = LOG_INFO
module.exports.LOG_WARN = LOG_WARN
module.exports.LOG_ERR = LOG_ERR