/**
 * Apply document as a first argument in "pre" hooks.
 */
const bindHookParams = fn => function bindParams(...args) {
  return fn.bind(this, this, ...args)
}

export default bindHookParams
