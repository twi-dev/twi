const firstToLower = string => string[0].toLowerCase() + string.slice(1)

function eachListener(listeners, cb) {
  for (const [key, listener] of Object.entries(listeners)) {
    const [type, name] = /^(once|on)(.*)$/.exec(key).slice(1)

    cb(listener, firstToLower(name), type)
  }
}

module.exports = eachListener
