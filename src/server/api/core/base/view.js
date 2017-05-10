import {join} from "path"

import {compile} from "pug"
import {readFile} from "promise-fs"
import {version, codename} from "package.json"

import merge from "lodash/merge"
import isFunction from "lodash/isFunction"

const VIEWS = join(process.cwd(), "view")

// Default settions of view renderer
const defaults = {
  views: VIEWS,
  debug: false,
  cache: false,
  locals: {
    system: {
      version,
      codename
    }
  }
}

// Tiny cache for Pug's template functions
const cache = new Map()

/**
 * Run Pug compiler
 *
 * @param string filename
 * @param object options
 *
 * @return function
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
  if (options.cache && isFunction(cache.get(filename))) {
    return cache.get(filename)
  }

  const fn = await compileFile(filename, options)

  return options.cache ? cache.set(filename).get(filename) : fn
}

async function render(filename, locals, options) {
  const fn = await compileTemplate(
    join(options.views, `${filename}.pug`), options
  )

  locals = merge({}, locals, options.locals)

  return fn(locals)
}

/**
 * Get render function for Koa context
 *
 * @param object options
 *
 * @return function renderer
 */
const getViewRenderer = options => async function renderer(filename, locals) {
  this.body = await render(filename, locals, options)
}

/**
 * Set up Pug view renderer on Koa context
 *
 * @param Koa koa
 * @param options object
 */
const view = options => getViewRenderer(
  merge({}, defaults, options, {
    pretty: false
  })
)

export {render}
export default view
