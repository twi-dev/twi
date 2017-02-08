import webpack from "webpack"

import {static as _static} from "server/core/helper/util/configure"

import createDevServer from "./devServer"
import configure from "./configure"

const STATIC_ROOT = `${process.cwd()}/static`

const runCompiler = (isDev = false) => new Promise(function(resolve, reject) {
  const fulfill = (err, stats) => err == null ? resolve(stats) : reject(err)

  const config = configure(isDev, _static.port)
  const compiler = webpack(config)

  if (!isDev) {
    return compiler.run(fulfill)
  }

  const devServerConfig = {
    devMiddleware: {
      contentBase: STATIC_ROOT,
      hot: true,
      lazy: false,
      publicPath: config.output.publicPath,
      stats: {
        colors: true
      }
    },
    hotMiddleware: {
      path: "/__webpack_hmr",
      heartbeat: 10 * 1000,
      log: console.log
    }
  }

  return createDevServer(compiler, devServerConfig)
    .listen(_static.port, fulfill)
})

export default runCompiler
