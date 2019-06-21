const {join} = require("path")
const {stat} = require("fs")

const rimraf = require("rimraf")
const chokidar = require("chokidar")

const processFiles = require("./processFiles")
const each = require("./eachListener")

const root = join(__dirname, "..")
const src = join(root, "src")

const getDest = filename => filename.replace(src, root)

const watcher = chokidar.watch(src)

function onError(err) {
  watcher.close()
  console.error(err)
  process.exit(1)
}

const exit = () => watcher.close()

function setDefaultCode() {
  if (process.exitCode == null) {
    process.exitCode = 0
  }
}

["SIGTERM", "SIGINT"].forEach(signal => process.on(signal, exit))

process
  .once("error", onError)
  .once("exit", setDefaultCode)

const onAdd = filename => processFiles([filename], {
  src, dest: getDest(filename), env: {dev: true}
}).catch(onError)

function onChange(path) {
  function fulfill(err, stats) {
    if (err) {
      return onError(err)
    }

    if (!stats.isDirectory()) {
      onAdd(path)
    }
  }

  stat(path, fulfill)
}

const onUnlink = path => rimraf(getDest(path), err => err && onError(err))

const addListener = (fn, name, type) => watcher[type](name, fn)

each({onAdd, onChange, onUnlink, onError}, addListener)
