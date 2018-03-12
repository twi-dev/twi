const {readFile} = require("fs")
const {join, extname} = require("path")

const applySourceMap = require("vinyl-sourcemaps-apply")
const through = require("through2")
const {transform} = require("@babel/core")

const fmt = require("sprintf-js").vsprintf

let babelrc = null

const assign = Object.assign

const EXTENSIONS = ["js", "mjs"]

const EXTENSIONS_REGEXPR = new RegExp(`.(${EXTENSIONS.join("|")})$`, "i")

/**
 * Check if given file is JS
 *
 * @param string filename – a path to file
 */
const isJS = filename => (
  EXTENSIONS.includes(extname(filename).slice(1))
)

/**
 * Compile given file via Babel
 *
 * @param File file – a file in Vinyl virtual file format
 * @param env – file encoding
 * @param object config
 * @param function cb
 */
function transformFile(file, enc, {env: {test}}, cb) {
  if (!isJS(file.path)) {
    console.log(fmt("Copy %s", [file.path]))
    return cb(null, file)
  }

  console.log(fmt("Compile %s", [file.path]))

  const [path, relative] = [file.path, file.relative]
    .map(p => p.replace(EXTENSIONS_REGEXPR, ".js"))

  try {
    const contents = transform(
      String(file.contents),
      assign({}, babelrc, {
        babelrc: false,
        filename: path,
        filenameRelative: relative,
        sourceMap: Boolean(file.sourceMap),
        sourceFileName: relative,
        sourceMapTarget: relative
      })
    )

    if (contents.map && test) {
      applySourceMap(file, contents.map)
    }

    file.contents = Buffer.from(contents.code)
    file.babel = contents.metadata
    file.path = path
  } catch (err) {
    return cb(err)
  }

  return cb(null, file)
}

const processFile = config => through.obj((file, enc, cb) => {
  function fulfill(err, content) {
    if (err != null) {
      return cb(err)
    }

    if (!content) {
      return cb(new Error("Babelrc required."))
    }

    try {
      babelrc = JSON.parse(content)

      // Add node-specific dynamic import polyfill
      babelrc.plugins.push("dynamic-import-node")
    } catch (err) {
      return cb(err)
    }

    transformFile(file, enc, config, cb)
  }

  if (!babelrc) {
    return readFile(join(config.root, ".babelrc"), fulfill)
  }

  transformFile(file, enc, config, cb)
})

module.exports = processFile
