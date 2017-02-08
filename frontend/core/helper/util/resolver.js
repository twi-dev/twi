const onFulfilled = cb => component => cb(null, component)

// tmp error hanlder
const onRejected = err => console.error(err)

const resolveModule = path => (state, cb) => (
  import(`${path}`).then(onFulfilled(cb), onRejected)
)

export default resolveModule
