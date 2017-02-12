import {realpath, readFile} from "promise-fs"
import objectIterator from "server/core/helper/util/objectIterator"
import getHostname from "server/core/helper/util/getHostname"
import {info} from "server/core/logger"

const servers = {
  backend: require("./backend"),
  static: require("./static")
}

async function getServer(koa, secure) {
  if (!secure) {
    const {createServer} = require("http")

    return createServer(koa.callback())
  }

  const CERTS_ROOT = await realpath(`${process.cwd()}/config/cert`)

  const key = await readFile(`${CERTS_ROOT}/twi.key`)
  const cert = await readFile(`${CERTS_ROOT}/twi.crt`)

  const {createServer} = require("http2")

  return createServer(koa.callback(), {key, cert})
}

const runServer = (name, config) => new Promise(function(resolve, reject) {
  const {app, host, port, secure} = config

  const onServer = server => (
    server
      .on("error", reject)
      .listen(port, () => resolve(
        info(
          `Twi "${name}" service successfully started on`,
          getHostname(host, port, secure)
        )
      ))
  )

  getServer(app, secure).then(onServer, reject)
})

async function runApp(isDev) {
  for (const [name, config] of objectIterator.entries(servers)) {
    if (isDev && name === "static") {
      continue
    }

    await runServer(name, config)
  }
}

export default runApp
