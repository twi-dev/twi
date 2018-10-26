/**
 * Run given tasks sequentially
 *
 * @param {Array<Promise<any>>} iterable
 * @param {any[]} [args = []] - a list of arguments to execute function with
 *
 * @return {Promise<Array<any>>}
 */
function runSerial(iterable, args = []) {
  const step = (prev, next) => Promise.resolve(prev).then(() => next(...args))

  if (iterable.length <= 1) {
    return step(null, iterable[0])
  }

  return iterable.reduce(step, null)
}

export default runSerial
