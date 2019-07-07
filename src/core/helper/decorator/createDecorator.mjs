import isFunction from "lodash/isFunction"

/**
 * Creates a function, class or method decorator using given function
 */
const createDecorator = decorator => (...args) => {
  const [target, , descriptor] = args

  if (isFunction(target) && args.length === 1) {
    return decorator(target)
  }

  if (isFunction(descriptor.initializer)) {
    const init = descriptor.initializer

    descriptor.initializer = function initializer() {
      return decorator(init.call(this))
    }
  } else {
    const fn = descriptor.value

    descriptor.value = decorator(fn)
  }

  return descriptor
}

export default createDecorator
