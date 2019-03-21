const {dirname, basename} = require("path")

const {stat} = require("promise-fs")

const vfs = require("vinyl-fs")
const junk = require("junk")
const plumber = require("gulp-plumber")
const isEmpty = require("lodash/isEmpty")

const processFile = require("./processFile")

const compilationErrorHandler = err => {
  // TODO: Improve errors
  console.error("Error!", err.message, err.codeFrame, err.pos, err.loc)
}

async function filterFiles(files, src) {
  const res = []

  for (const file of files) {
    const fstat = await stat(file)

    if (!fstat.isDirectory() && junk.not(basename(file)) && file !== src) {
      res.push(file)
    }
  }

  return res
}

const run = (files, config) => new Promise((resolve, reject) => {
  if (isEmpty(files)) {
    return resolve()
  }

  const dev = config.env.dev

  const errorHandler = dev ? compilationErrorHandler : reject

  // TODO: Improve files compilation process because chokidar
  // emits "add" event for each file separately
  const stream = vfs.src(files)
    .pipe(plumber({errorHandler}))
    .pipe(processFile(config))
    .pipe(vfs.dest(dirname(config.dest)))

  if (!dev) {
    stream.on("end", resolve)
  }
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
