const nextTick = process.nextTick

// Experimental
const createAsyncCallback = fn => function(...args) {
  const fulfill = () => fn(...args)

  nextTick(fulfill)
}

export default createAsyncCallback
