import omit from "lodash/omit"

import log from "lib/log"
import HttpException from "lib/error/http/HttpException"

let defaults = new HttpException()

defaults = omit({
  ...defaults, message: defaults.message // Because message is not enumerable
}, "stack")

const excludes = ["originalError", "name"]

if (process.env.NODE_ENV === "production") {
  excludes.push("stack")
}

const formatError = err => {
  log.error(err)

  return omit({
    ...defaults, ...err, ...err.originalError, stack: err.stack
  }, excludes)
}

export default formatError
