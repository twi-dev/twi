import {pointer, tick, info as _info, warning, cross} from "figures"
import {white, green, cyan, yellow, red} from "chalk"

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

function log(...args) {
  const level = args.pop()

  const method = METHODS[level]
  const label = LABELS[level]

  console[method](label, ...args)
}

const normal = (...messages) => log(...messages, 0)

const ok = (...messages) => log(...messages, 1)

const info = (...messages) => log(...messages, 2)

const warn = (...messages) => log(...messages, 3)

const error = (...messages) => log(...messages, 4)

log.normal = normal
log.ok = ok
log.info = info
log.warn = warn
log.error = error

export {normal, ok, info, warn, error}
export default log
