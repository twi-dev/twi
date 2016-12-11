###
# Replace .coffee extname to .js
#
# @param string filename
# @return string
###
replaceExtname = (filename) ->
  filename.replace /\.(coffee|litcoffee|coffee\.md|cjsx)$/, ".js"

module.exports = replaceExtname
