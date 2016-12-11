{assign} = Object
{compile} = require "coffee-script"
{fromJSON} = require "convert-source-map"

replaceExtname = require "../../common/helper/replaceExtname"

cjsx = (contents) ->
  {options: {sourceMap}} = this

  defaults = {
    bare: on
    header: off
  }

  filename = @resourcePath

  try
    contents = compile contents, assign {}, defaults, {
      sourceMap, filename, generatedFile: replaceExtname filename
    }
  return contents unless sourceMap

  map = fromJSON contents.v3SourceMap
  map.setProperty "sources", [filename]
  return "#{contents.js}\n#{do map.toComment}\n"

  catch err
    return cb err

module.exports = cjsx
