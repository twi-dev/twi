co = require "co"
glob = require "glob"
{isEmpty} = require "lodash"
{basename, extname} = require "path"
{realpathSync} = require "fs"
{makeRequireTransform} = require "browserify-transform-tools"
{read} = require "node-yaml"

LANGS_ROOT = "#{__dirname}/../../langs"

###
# Browserify i18next helper for Twi frontend app
###
module.exports = makeRequireTransform "langify", (args, opts, cb) ->
  return cb null unless args[0] is "twi/langs"

  glob "#{LANGS_ROOT}/**/frontend/*.yml", (err, files) ->
    return cb err if err?

    return cb null if isEmpty files

    onFulfiled = (res) -> cb null, "#{res}"

    onRejected = (err) -> cb err

    co ->
      langs = []
      for filename, idx in files
        [lang] = /([a-z]{2}-[A-Z]{2})/.exec filename
        langs.push lang unless lang in langs

      res = "({\n"
      for lang, i in langs
        res += "  \"#{lang}\": {\n"
        res += "    translation: {\n      "
        for filename, idx in files when filename.includes lang
          res += "
            #{basename filename, extname filename}: #{
              JSON.stringify (yield read filename)
            }
          "
          res += if idx < files.length - 1 then  ", \n" else "\n"
        res += "    }\n"
        res += "  }"
        res += if i < langs.length - 1 then ", \n" else "\n"
      res += "})"

      return res
    .then onFullfiled, onRejected
