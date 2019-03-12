import util from "util"

import isFunction from "lodash/isFunction"

const decorator = (fn, message, code) => util.deprecate(fn, message, code)

const deprecate = (message, code) => (target, key, descriptor) => {
  if (isFunction(descriptor.initializer)) {
    const init = descriptor.initializer

    descriptor.initializer = function initializer() {
      return decorator(init.call(this), message, code)
    }
  } else {
    const fn = descriptor.value

    descriptor.value = decorator(fn, message, code)
  }

  return descriptor
}

export default deprecate
