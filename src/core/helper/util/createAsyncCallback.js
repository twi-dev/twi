const nextTick = process.nextTick
  ? window && window.setImmediate
  : cb => setTimeout(cb, 0)

// Experimental
const createAsyncCallback = fn => function(...args) {
  const fulfill = () => fn(...args)

  nextTick(fulfill)
}

export default createAsyncCallback
