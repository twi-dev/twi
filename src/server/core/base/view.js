import {compile} from "pug"
import {readFile} from "promise-fs"
import {version} from "package.json"

import merge from "lodash/merge"
import isEmpty from "lodash/isEmpty"
import getHostname from "core/helper/util/getHostname"

import {
  app, static as staticServer, isDev
} from "core/helper/util/configure"

const VIEWS = `${process.env()}/views`

const staticHostname = getHostname(
  staticServer.host,
  staticServer.port,
  staticServer.secure
)

const defaults = {
  views: VIEWS,
  debug: isDev,
  cache: !isDev
}

const twi = {
  name: app.name,
  lang: app.lang,
  version
}

// Cache for Pug's template function
const cache = {}

/**
 * Run Pug compiler
 *
 * @param string filename
 * @param object options
 */
const compileFile = async (filename, options) => compile(
  await readFile(filename), {
    ...options, filename
  }
)

/**
 * Compile template from given path
 *
 * @param string filename
 * @param object options
 *
 * @return function
 */
async function compileTemplate(filename, options) {
  if (filename in cache && !isEmpty(cache[filename])) {
    return cache[filename]
  }

  const fn = await compileFile(filename, options)

  return options.cache ? (cache[filename] = fn) : fn
}

/**
 * Get render function for Koa context
 *
 * @param object options
 *
 * @return function render
 */
const getViewRenderer = options => async function render(filename, locals) {
  const fn = await compileTemplate(
    `${options.views}/${filename}`, options
  )

  locals = merge({}, locals, {
    twi, sys: {
      static: staticHostname
    }
  })

  this.body = fn(locals)
}

/**
 * Extend koa context with our renderer
 *
 * @param Koa koa
 * @param object options
 */
function setRenderer(koa, options) {
  koa.context.render = getViewRenderer(
    merge({}, defaults, options, {
      pretty: false
    })
  )
}

/**
 * Set up Pug view renderer on Koa context
 *
 * @param Koa koa
 * @param options object
 */
const view = (koa, options = {debug: false}) => setRenderer(koa, options)

export default view
