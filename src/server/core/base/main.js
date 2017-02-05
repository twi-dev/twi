import {realpath, readFile} from "promise-fs"
import objectIterator from "core/helper/util/objectIterator"

const servers = {}

async function getServer(koa, secure) {
  if (!secure) {
    const {createServer} = require("createServer")

    return createServer(koa.callback())
  }

  const CERTS_ROOT = await realpath(`${process.cwd()}/config/cert`)

  const key = await readFile(`${CERTS_ROOT}/twi.key`)
  const cert = await readFile(`${CERTS_ROOT}/twi.crt`)

  const {createServer} = require("http2")

  return createServer(koa.callback(), {key, cert})
}

const runServer = config => new Promise(function(resolve, reject) {
  const {app, host, port, secure, msg} = config

  const onServer = server => (
    server
      .on("error", reject)
      .listen("port", () => resolve(
        console.log(msg)
      ))
  )

  getServer(app, secure).then(onServer, reject)
})

async function runApp(isDev) {
  for (const [name, server] of objectIterator.entries(servers)) {
    if (isDev && name === "static") {
      continue
    }

    await runServer(server)
  }
}

export default runApp
