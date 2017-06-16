const {resolve, isAbsolute} = require("path")
const fs = require("fs")

const {cross, pointer} = require("figures")
const globby = require("globby")
const rimraf = require("rimraf")
const isFunction = require("lodash/isFunction")
const {red, cyan} = require("chalk")
const chokidar = require("chokidar")
const mkdir = require("mkdirp")

const processFiles = require("./processFiles")

const resolveFullSrcPath = (path, root) => (
  isAbsolute(path) ? path : resolve(root, path)
)

const resolveFullDestPath = (path, root) => (
  isAbsolute(path) ? path : resolve(root, path)
)

const getDestFilename = (filename, src, dest) => (
  filename.replace(src, dest)
)

/**
 * Error hanlder for all in-process errors
 *
 * @param Error err
 */
const onError = ({dev}) => function(err) {
  if (dev) {
    console.log(err)
    console.log(red(cross), "Watching for changes...")
    return
  }

  console.log(red(cross), err)
  process.exit(1)
}

/**
 * Add event handlers to Chokidar watcher
 *
 * @param chokidar.FSWatcher watcher
 * @param object handlers
 */
function mapHandlers(watcher, handlers) {
  const keys = Object.keys(handlers)

  for (let name of keys) {
    const handler = handlers[name]

    // Cut and decapitalize handler name
    if (name.startsWith("on")) {
      name = name.slice(2)
      name = name.charAt(0).toLowerCase() + name.slice(1)
    }

    watcher.on(name, handler)
  }

  return watcher
}

/**
 * Build all files from "src" dir
 *
 * @param string src
 * @param string dest
 */
const make = config => new Promise((resolve, reject) => {
  const onFulfilled = files => processFiles(files, config).then(resolve, reject)

  globby(`${config.src}/**`).then(onFulfilled, onError(config.env))
})

/**
 * Run cake in "watch" mode for development
 *
 * @param string src
 * @param string dest
 */
const watch = config => new Promise((_, reject) => {
  console.log(cyan(pointer), "Starting watcher...")
  console.log(cyan(pointer), "You can press Control+C to exit.")

  const {src, dest} = config

  /**
   * Create a directory on "addDir" event and compile included files (if exists)
   *
   * @param string filename
   */
  function onAddDir(filename) {
    const onFulfilled = files => processFiles(files, config).catch(reject)

    const created = err => (
      err && err.code !== "EEXIST"
        ? reject(err)
        : globby(`${filename}/**`).then(onFulfilled, reject)
    )

    const destFilename = getDestFilename(filename, src, dest)

    mkdir(destFilename, created)
  }

  /**
   * Rebuild given file on "add" event
   *
   * @param string filename
   */
  const onAdd = filename => processFiles([filename], config).catch(reject)

  /**
   * Remore given file on "unlink" event
   *
   * @param string filename
   */
  const onUnlink = filename => rimraf(
    getDestFilename(filename, src, dest), err => err && onError(err)
  )

  /**
   * Remore given directory on "unlinkDir" event
   *
   * @param string filename
   */
  const onUnlinkDir = filename => rimraf(
    getDestFilename(filename, src, dest), err => err && onError(err)
  )

  /**
   * Rebuild file/directory on change event
   *
   * @param string filename
   * @param fs.Stat stat
   */
  function onChange(filename, stat) {
    const fulfill = stat => (
      stat.isDirectory() ? onAddDir(filename) : onAdd(filename)
    )

    const onStat = (err, stat) => err ? onError(err) : fulfill(stat)

    // TODO: I think it's actually triggering only for files events.
    //   I need a tiny research of chokidar docs and maybe fix that thing.
    stat && isFunction(stat.isDirectory)
      ? fulfill(stat)
      : fs.stat(filename, onStat)
  }

  const ignoreInitial = config.ignoreInitial || true

  // Create chokidar.FSWatcher instance that watches for "src" path
  const watcher = chokidar.watch(src, {
    ignoreInitial
  })

  // Add handlers to watcher
  mapHandlers(watcher, {
    onError: reject,
    onAdd,
    onAddDir,
    onChange,
    onUnlink,
    onUnlinkDir
  })
})

/**
 * @return Promise
 */
function build(config) {
  config.src = resolveFullSrcPath(config.src, config.root)
  config.dest = resolveFullDestPath(config.dest, config.root)

  return config.env.dev ? watch(config) : make(config)
}

module.exports = build
