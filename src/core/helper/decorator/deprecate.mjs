import isFunction from "lodash/isFunction"

const deprecate = message => function decorate(target, key, descriptor) {
  let called = false

  const decorator = fn => (...args) => {
    if (!called) {
      console.warn("Deprecation warning: %s", String(message))
      called = true
    }

    return fn(...args)
  }

  if (isFunction(target) || arguments.length <= 1) {
    return decorator(target)
  }

  if (isFunction(descriptor.initializer)) {
    const init = descriptor.initializer

    descriptor.initializer = function initializer() {
      return decorator(init.call(this))
    }
  } else {
    const handler = descriptor.value

    descriptor.value = decorator(handler)
  }

  return descriptor
}

export default deprecate
