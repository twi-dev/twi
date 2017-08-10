import console from "console"

import {pointer, tick, info as _info, warning, cross} from "figures"
import {white, green, cyan, yellow, red} from "chalk"
import {sprintf as fmt} from "sprintf-js"

const LABELS = [
  white(pointer),
  green(tick),
  cyan(_info),
  yellow(warning),
  red(cross)
]

const METHODS = [
  "log",
  "log",
  "info",
  "warn",
  "error"
]

function log(level, message, ...format) {
  const method = METHODS[level]
  const label = LABELS[level]

  console[method](fmt(`${label} ${message}`, ...format))
}

const normal = (message, ...format) => log(0, message, ...format)

const ok = (message, ...format) => log(1, message, ...format)

const info = (message, ...format) => log(2, message, ...format)

const warn = (message, ...format) => log(3, message, ...format)

const error = (message, ...format) => log(4, message, ...format)

log.normal = normal
log.ok = ok
log.info = info
log.warn = warn
log.error = error

export {normal, ok, info, warn, error}
export default log
