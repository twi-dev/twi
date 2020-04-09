/**
 * Run given tasks in parallel
 *
 * @param {Array<(...args: any[]) => any>} tasks
 * @param {any[]} [args = []] - a list of arguments to execute function with
 *
 * @return {Promise<Array<any>>}
 */
const runParallel = (tasks, args = []) => (
  Promise.all(tasks.map(task => task(...args)))
)

export default runParallel
