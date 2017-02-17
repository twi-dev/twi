/**
 * Promisify a callback-style function
 *
 * @param function callee – target callback-style function
 *
 * @return function
 */
const promisify = callee => function(...args) {
  const ctx = this

  return new Promise(function(resolve, reject) {
    const fulfill = (err, res) => err ? reject(err) : resolve(res)

    callee.apply(ctx, [...args, fulfill])
  })
}

export default promisify
