{assign} = Object
{compile} = require "coffee-script"
{fromJSON} = require "convert-source-map"

replaceExtname = require "../../common/helper/replaceExtname"

cjsx = (contents) ->
  {options: {sourceMap}} = this

  cb = do @async

  defaults = {
    bare: on
    header: off
  }

  filename = @resourcePath

  try
    contents = compile contents, assign {}, defaults, {
      sourceMap, filename, generatedFile: replaceExtname filename
    }

    return cb null, contents unless sourceMap

    map = fromJSON contents.v3SourceMap
    map.setProperty "sources", [filename]

    return cb null, "#{contents.js}\n#{do map.toComment}\n"
  catch err
    return cb err

module.exports = cjsx
