{Readable} = require "stream"
{isPlainObject, isArray} = require "lodash"

mapFiles = (obj, fn, ctx = null) ->
  res = if isArray obj then [] else {}

  for own __k, __v of obj
    if isPlainObject(__v) or isArray(__v)
      res[__k] = await mapFiles __v, fn, ctx
    else if __v instanceof Readable
      res[__k] = await fn.call ctx, __v
    else
      res[__k] = __v

  return res

module.exports = mapFiles
