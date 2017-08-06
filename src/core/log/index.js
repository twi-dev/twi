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

// TODO: Move "level" param to first position
function log(message, level, ...format) {
  if (!LABELS.includes(level)) {
    format.unshift(level)
  }

  const method = METHODS[level]
  const label = LABELS[level]

  console[method](fmt(`${label} ${message}`, ...format))
}

const normal = (...message) => log(...message, 0)

const ok = (...message) => log(...message, 1)

const info = (...message) => log(...message, 2)

const warn = (...message) => log(...message, 3)

const error = (...message) => log(...message, 4)

log.normal = normal
log.ok = ok
log.info = info
log.warn = warn
log.error = error

export {normal, ok, info, warn, error}
export default log
