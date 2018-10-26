/**
 * @return {Promise<Array<any>>}
 */
function runWaterfall(tasks, initial) {
  const step = (prev, next) => Promise.resolve(prev).then(res => next(res))

  if (tasks.length === 1) {
    return step(initial, tasks[0])
  }

  return tasks.reduce(step, initial)
}

export default runWaterfall
