const isArray = Array.isArray

/**
 * Flattens a given array
 *
 * @param {any[]} array
 * @param {number} [depth = 1]
 */
function flat(array, depth = 1) {
  const walk = (prev, next) => (
    prev.concat(isArray(next) && depth > 0 ? flat(next, depth - 1) : [next])
  )

  return array.reduce(walk, [])
}

export default flat
