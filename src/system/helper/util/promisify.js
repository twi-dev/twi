/**
 * Promisify a callback-style function
 *
 * @param function target – a callback-style function
 *
 * @return function
 *
 * Example
 * ```js
 * import fs from "fs"
 *
 * const readFile = promisify(fs.readFile)
 *
 * const onFulfilled = content => console.log(String(content))
 *
 * const onRejected = err => console.error(err)
 *
 * readFile(require.main.filename).then(onFulfilled, onRejected)
 * ```
 */
const promisify = target => function(...args) {
  const ctx = this

  return new Promise((resolve, reject) => {
    const fulfill = (err, res) => err ? reject(err) : resolve(res)

    target.apply(ctx, [...args, fulfill])
  })
}

export default promisify
