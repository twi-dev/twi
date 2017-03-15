/**
 * Promisify a callback-style function
 *
 * @param function target – a callback-style function
 *
 * @return function
 */
const promisify = target => function(...args) {
  const ctx = this

  return new Promise((resolve, reject) => {
    const fulfill = (err, res) => err ? reject(err) : resolve(res)

    target.apply(ctx, [...args, fulfill])
  })
}

export default promisify
