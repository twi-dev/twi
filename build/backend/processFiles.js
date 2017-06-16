const dirname = require("path").dirname

const vfs = require("vinyl-fs")
const junk = require("junk")
const plumber = require("gulp-plumber")
const stat = require("promise-fs").stat
const isEmpty = require("lodash/isEmpty")

const processFile = require("./processFile")

const getDestPath = (src, dest) => ({path}) => dirname(path.replace(src, dest))

async function filterFiles(files, src) {
  const res = []

  let stats = []
  for (const file of files) {
    stats.push(stat(file))
  }

  stats = await Promise.all(stats)

  for (const [key, val] of stats.entries()) {
    if (!val.isDirectory() && junk.not(val) && val !== src) {
      res.push(files[key])
    }
  }

  return res
}

const run = (files, config) => new Promise((resolve, reject) => {
  if (isEmpty(files)) {
    return resolve()
  }

  const {src, dest} = config
  const dev = config.env.dev

  const stream = vfs.src(files)
    .pipe(plumber({errorHandler: reject}))
    .pipe(processFile(config))
    .pipe(vfs.dest(getDestPath(src, dest)))

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
