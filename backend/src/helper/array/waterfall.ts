type MaybePromise<T = any> = Promise<T> | T

interface Task {
  (...args: any[]): MaybePromise
}

const step = (prev: MaybePromise, next: Task) => (
  Promise.resolve(prev).then(res => next(res))
)

function waterfall(
  tasks: Task[],
  initial: any = undefined
): Promise<any> {
  if (tasks.length <= 1) {
    return step(initial, tasks[0])
  }

  return tasks.reduce(step, initial) as Promise<any>
}

export default waterfall
