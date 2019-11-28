/**
 * Creates a callback function that will be executed on next event loop tick
 */
const createAsyncCallback = fn => (...args) => process.nextTick(fn, ...args)

export default createAsyncCallback
