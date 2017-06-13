const dirname = require("path").dirname

const vfs = require("vinyl-fs")
const junk = require("junk")
const plumber = require("gulp-plumber")
const stat = require("promise-fs").stat

const processFile = require("./processFile")

const getDestPath = (src, dest) => ({path}) => dirname(path.replace(src, dest))

async function filterFiles(files, src) {
  const res = []

  let ref = []
  for (const file of files) {
    ref.push(stat(file))
  }

  ref = await Promise.all(ref)

  for (const [key, val] of ref.entries()) {
    if (!val.isDirectory() && junk.not(val) && val !== src) {
      res.push(files[key])
    }
  }

  return res
}

const run = (files, config) => new Promise((resolve, reject) => {
  const {src, dest} = config

  vfs.src(files)
    .pipe(plumber({errorHandler: reject}))
    .pipe(processFile(config))
    .pipe(vfs.dest(getDestPath(src, dest)))
    .on("end", resolve)
})

/**
 * Process given files via vinyl-fs, through2 and babel
 *
 * @param array files
 * @param string src
 * @param string dest
 */
const processFiles = (files, config) => new Promise((resolve, reject) => {
  const onFulfilled = files => run(files, config)

  filterFiles(files, config.src).then(onFulfilled).then(resolve, reject)
})

module.exports = processFiles