###
# Return value from "default" property wrapped by babel
#
# @param any obj
#
# @return any
###
requireDefault = (obj) ->
  return if obj and obj["__esModule"] and obj.default then obj.default else obj

module.exports = requireDefault
