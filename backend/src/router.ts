import {resolve, basename, extname} from "path"
import {opendir} from "fs/promises"

import Router from "@koa/router"

import interop from "helper/util/interopRequireDefault"

const ROUTES_ROOT = resolve(process.env.SERVER_ROOT!, "route")

/**
 * Creates a new Router instance with the routes read from `/route` directory.
 */
async function getRouter(): Promise<Router> {
  const dir = await opendir(ROUTES_ROOT)

  const router = new Router()

  for await (const {name} of dir) {
    const r = interop<Router>(await import(resolve(ROUTES_ROOT, name)))

    const pathname = `/${basename(name, extname(name))}`

    router.use(pathname, r.routes(), r.allowedMethods())
  }

  return router
}

export default getRouter
