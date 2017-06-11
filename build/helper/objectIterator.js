function* objectIterator(obj, withEntries = false) {
  const entries = obj ? Object.entries(obj) : []

  for (const [key, value] of entries) {
    yield withEntries === true ? [key, value] : value
  }
}

const entries = obj => objectIterator(obj, true)

module.exports = objectIterator
module.exports.entries = entries
