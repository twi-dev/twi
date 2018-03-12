function* range(min, max) {
  if (!max) {
    [max, min] = [min, 0]
  }

  for (let value = min; value <= max; value += 1) {
    yield value
  }
}

export default range
