Koa = require "koa"
serve = require "koa-static"
busboy = require "then-busboy"

{readFile} = require "promise-fs"
{app: {port, host}} = require "../../core/helper/configure"
code = do require "shortid"

NotFoundException = require "../../core/error/NotFound"

koa = new Koa

write = (line) -> process.stdout.write "#{line}"
writeErr = (err) -> process.stderr.write "#{err}"

tinyInterpolation = (str, locals) ->
  return str.replace /\#\{([a-zA-Z0-9]+)}/mg, (m, k) -> locals[k]

koa.use (ctx, next) ->
  try
    await do next
  catch err
    writeErr String err
    process.exit 1

koa.use serve "#{__dirname}/assets"

koa.use (ctx, next) ->
  unless ctx.url.endsWith code
    return await do next

  if ctx.method is "GET"
    contents = String await readFile "#{__dirname}/view/index.html"
    ctx.body = tinyInterpolation contents, {code}
  else if ctx.method "POST"
    unless ctx.url.endsWith code
      return await do next

    console.log await busboy ctx.req
    ctx.body = "Registration will be here..."

  await do next

koa.listen port, ->
  write """
    Registration server started.
    Please, visit one of the following links to complete the registration:
    From remote client: #{host}/#{code}
    From localhost: http://localhost:#{port}/#{code}
  """

process.on "SIGINT", ->
  writeErr "Server has been closed. Registration canceled."
  process.exit 1
