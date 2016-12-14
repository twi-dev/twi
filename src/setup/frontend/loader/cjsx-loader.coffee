{transform} = require "coffee-react"
# {assign} = Object

cjsx = (contents) ->
  {options} = this

  cb = do @async

  config = {
    bare: on
    header: off
  }

  try
    return cb null, transform contents, config
  catch err
    return cb err

module.exports = cjsx
