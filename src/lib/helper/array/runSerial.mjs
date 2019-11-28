/**
 * Run given tasks sequentially
 *
 * @param {Array<Promise<any>>} tasks
 * @param {any[]} [args = []] - a list of arguments to execute function with
 *
 * @return {Promise<any>}
 */
function runSerial(tasks, args = []) {
  const step = (prev, next) => Promise.resolve(prev).then(() => next(...args))

  if (tasks.length <= 1) {
    return step(null, tasks[0])
  }

  return tasks.reduce(step, null)
}

export default runSerial
