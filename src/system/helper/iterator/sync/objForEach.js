import objectIterator from "./objectIterator"

function objForEach(obj, cb, ctx = null) {
  for (const [key, value] of objectIterator.entries(obj)) {
    cb.call(ctx, value, key, obj)
  }
}


export default objForEach
