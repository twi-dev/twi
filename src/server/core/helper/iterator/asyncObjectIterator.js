// Experemintal
async function* asyncObjectIterator(obj, entries = false) {
  const keys = Object.keys(obj)

  for (const key of keys) {
    const value = obj[key]

    yield entries ? [key, value] : value
  }
}

const entries = obj => asyncObjectIterator(obj, true)

asyncObjectIterator.entries = entries

export {entries}
export default asyncObjectIterator
