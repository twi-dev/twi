/**
 * @return {Promise<Array<any>>}
 */
const runParallel = (tasks, args) => (
  Promise.all(tasks.map(task => task(...args)))
)

export default runParallel
