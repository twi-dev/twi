function* objectIterator(obj, entries = false) {
  const keys = Object.keys(obj)

  for (const key of keys) {
    const value = obj[key]

    yield entries ? [key, value] : value
  }
}

const entries = obj => objectIterator(obj, true)

export {entries}
export default objectIterator
