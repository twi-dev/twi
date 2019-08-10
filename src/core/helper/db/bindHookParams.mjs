/**
 * Apply document as a first argument in "pre" hooks.
 */
const bindHookParams = fn => function bindParams(...args) {
  return fn.call(this, this, ...args)
}

export default bindHookParams
