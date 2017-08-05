import iterator from "./objectIterator"

function objFindKey(obj, predicate, ctx = null) {
  for (const [key, value] of iterator.entries(obj)) {
    if (predicate.call(ctx, value, key, obj) === true) {
      return key
    }
  }
}

export default objFindKey
