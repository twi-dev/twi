through = require "through2"

{assign} = Object
{extname} = require "path"
{compile} = require "coffee-script"
{transform} = require "coffee-react"
{makeStringTransform} = require "browserify-transform-tools"
{fromJSON} = require "convert-source-map"

COFFEE_EXTNAMES = [".coffee", ".litcoffee", ".coffee.md", ".cjsx"]

isCoffee = (filename) -> extname(filename) in COFFEE_EXTNAMES

###
# Replace .coffee extname to .js
#
# @param string filename
# @return string
###
replaceExtname = (filename) ->
  filename.replace /\.(coffee|litcoffee|coffee\.md|cjsx)$/, ".js"

cjsx = (contents, opts, cb) ->
  {file, config: {sourceMap}} = opts

  return cb null, contents unless isCoffee opts.file

  config = {
    bare: on
    header: off
  }

  try
    contents = transform contents, assign {}, config
    contents = compile contents, assign {}, config, {
      filename: file
      generatedFile: replaceExtname file
      inline: on
      sourceMap
    }
  catch err
    return cb err

  return cb null, contents unless sourceMap

  map = fromJSON contents.v3SourceMap
  map.setProperty "sources", [file]
  cb null, "#{contents.js}\n#{do map.toComment}\n"

module.exports = makeStringTransform "coffee-transform", cjsx
