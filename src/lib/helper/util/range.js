function range(min, max) {
  if (!max) {
    [max, min] = [min, 0]
  }

  const arr = []

  for (let i = min; i <= max; i += 1) {
    arr.push(i)
  }

  return arr
}

export default range
