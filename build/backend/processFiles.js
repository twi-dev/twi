const vfs = require("vinyl-fs")
const junk = require("junk")
const plumber = require("gulp-plumber")

const processFile = require("./processFile")

const getDestPath = (src, dest) => filename => filename.replace(src, dest)

const errorHandler = error => process.emit("error", error)

const onEnd = (dev = false) => function() {
  if (!dev) {
    console.log("Done without errors.")
    process.exit(0)
  }
}

/**
 * Process given files via vinyl-fs, through2 and babel
 *
 * @param array files
 * @param string src
 * @param string dest
 */
function processFiles(files, config) {
  const dev = config.env.dev
  const {src, dest} = config

  files = files.filter(file => junk.not(file) || file !== src)

  vfs.src(files)
    .pipe(plumber({errorHandler}))
    .pipe(processFile(config))
    .pipe(getDestPath(src, dest))
    .on("end", onEnd(dev))
}

module.exports = processFiles
