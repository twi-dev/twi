/**
 * Simplest object iterator which I can imagine :D
 *
 * @param object obj
 * @param boolean entries
 *
 * @yields any|array
 */
function* objectIterator(obj, entries = false) {
  const keys = Object.keys(obj)

  for (const key of keys) {
    const value = obj[key]

    yield entries ? [key, value] : value
  }
}

const entries = obj => objectIterator(obj, true)

objectIterator.entries = entries

export {entries}
export default objectIterator
