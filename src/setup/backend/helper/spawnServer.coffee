ora = do require "ora"

spawnServer = (stackTrace = no) -> new Promise (resolve, reject) ->
  onStdout = (message) ->
    log String message
    ora.text = "Waiting..."
    do ora.start

  onStderr = (message) ->
    ora.text = String message
    do ora.fail

  onClose = (code) ->
    if code is 0
      do ora.stop
      do resolve
    else
      reject new ReferenceError "Process was exit with non-zero code."

  onError = (err) -> reject err

  args = ["#{__dirname}/../server"]
  args.push "--stack-strace" if stackTrace

  proc = spawn "node", args
    .on "close", onClose
    .on "errror", onError

  proc.stdout.on "data", onStdout
  proc.stderr.on "data", onStderr
  return

module.exports = spawnServer
