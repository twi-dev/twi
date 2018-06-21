const {extname} = require("path")

const through = require("through2")

const {transform} = require("@babel/core")

const fmt = require("sprintf-js").vsprintf

const EXTENSIONS = ["js", "mjs"]

const EXTENSIONS_REGEXPR = new RegExp(`.(${EXTENSIONS.join("|")})$`, "i")

/**
 * Check if given file is JS
 *
 * @param string filename – a path to file
 */
const isJSFile = filename => (
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
function transformFile(file, enc, cb) {
  if (!isJSFile(file.path)) {
    console.log(fmt("Copy %s", [file.path]))

    return cb(null, file)
  }

  console.log(fmt("Compile %s", [file.path]))

  const [path, relative] = [file.path, file.relative]
    .map(p => p.replace(EXTENSIONS_REGEXPR, ".js"))

  try {
    const contents = transform(
      String(file.contents), {
        babelrc: true,
        filename: path,
        filenameRelative: relative,
        sourceMap: Boolean(file.sourceMap),
        sourceFileName: relative
      }
    )

    file.contents = Buffer.from(contents.code)
    file.babel = contents.metadata
    file.path = path
  } catch (err) {
    return cb(err)
  }

  return cb(null, file)
}

const processFile = () => through.obj((file, enc, cb) => (
  void transformFile(file, enc, cb)
))

module.exports = processFile
