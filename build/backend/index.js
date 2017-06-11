#!/usr/bin/env node

/**
 * Build your Babel project with a cake!
 *
 * @license MIT
 * @author Nick K. <https://github.com/octet-stream>
 */
const {resolve, isAbsolute} = require("path")
const fs = require("fs")

const {cross, pointer} = require("figures")
const globby = require("globby")
const rimraf = require("rimraf")
const ora = require("ora")({stream: process.stdout})
const isFunction = require("lodash/isFunction")
const {red, cyan} = require("chalk")
const chokidar = require("chokidar")
const mkdir = require("mkdirp")

const processFiles = require("./processFiles")

const assign = Object.assign

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

  ora.stop()
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
function make(src, dest, config) {
  ora.start()

  const onFulfilled = files => processFiles(files, config)

  globby(`${src}/**`).then(onFulfilled, onError)
}

/**
 * Run cake in "watch" mode for development
 *
 * @param string src
 * @param string dest
 */
function watch(src, dest, config) {
  console.log(cyan(pointer), "Starting watcher...")
  console.log(cyan(pointer), "You can press Control+C to exit.")

  /**
   * Create a directory on "addDir" event and compile included files (if exists)
   *
   * @param string filename
   */
  function onAddDir(filename) {
    const onFulfilled = files => processFiles(files, config)

    const created = err => (
      err && err.code !== "EEXIST"
        ? onError(err)
        : globby(`${filename}/**`).then(onFulfilled, onError)
    )

    const destFilename = getDestFilename(filename, src, dest)

    mkdir(destFilename, created)
  }

  /**
   * Rebuild given file on "add" event
   *
   * @param string filename
   */
  const onAdd = filename => processFiles([filename], config)

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

  // Create chokidar.FSWatcher instance that watches for "src" path
  const watcher = chokidar.watch(src, {
    ignoreInitial: true
  })

  // Add handlers to watcher
  mapHandlers(watcher, {
    onError,
    onAdd,
    onAddDir,
    onChange,
    onUnlink,
    onUnlinkDir
  })
}

function run(src, dest, config) {
  src = resolveFullSrcPath(src, config.root)
  dest = resolveFullDestPath(dest, config.root)

  process.on("error", onError(config.env))

  config = assign({}, config, {
    src, dest
  })

  return config.env.dev
    ? watch(src, dest, config)
    : make(src, dest, config)
}

module.exports = run
