"use strict"

{compile} = require "pug"
{merge, isPlainObject} = require "lodash"
{readFile} = require "promise-fs"
{realpathSync} = require "fs"
{version, codename} = require "../../package.json"
{t} = require "../i18n"

{
  app: {name, credits, theme}
  static: {host, port, secure}
  IS_DEVEL
} = require "../helper/configure"

getHostname = require "../helper/util/getHostname"

theme or= "twi"
VIEWS = realpathSync "#{__dirname}/../../theme/#{theme}/view"
{NODE_ENV} = process.env

config = null

# Tiny cache for rendered templates :D
cache = {}

defaults =
  views: VIEWS
  debug: IS_DEVEL
  cache: not IS_DEVEL

twi =
  name: name
  version: version
  codename: codename
  theme: theme

staticHostname = getHostname host, port, secure

compiler = (filename) ->
  content = await readFile filename
  await return compile content, merge {}, config, filename: filename

render = (filename, values) ->
  template = unless filename of cache
    fn = await compiler "#{defaults.views}/#{filename}.pug"
    if config.cache
      cache[filename] = fn
    else
      fn
  else
    cache[filename]

  values = merge {}, values, {
    user: @req.user
    twi,
    sys: {
      @csrf, @url, @path
      rd: @query.rd or "/"
      static: staticHostname
    }
  }, {t}

  @body = template values

view = (koa, custom = {}) ->
  config = merge {}, defaults, custom, pretty: no
  koa.context.render = render

module.exports = view
