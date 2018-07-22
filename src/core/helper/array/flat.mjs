const isArray = Array.isArray

function flat(array) {
  const walk = (prev, next) => isArray(next) ? flat(next) : prev.concat([next])

  return array.reduce(walk, [])
}

export default flat
