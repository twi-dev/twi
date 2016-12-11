{transform} = require "coffee-react"
# {assign} = Object

cjsx = (contents) ->
  {options} = this

  config = {
    bare: on
    header: off
  }

  try
    contents = transform contents, config
  catch err
    return cb err

  return contents

module.exports = cjsx
