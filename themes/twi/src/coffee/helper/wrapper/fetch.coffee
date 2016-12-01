isPlainObject = require "lodash/isPlainObject"
merge = require "lodash/merge"

defs =
  method: "GET"
  type: "json"
  credentials: "same-origin"
  headers:
    "X-Requested-With": "Fetch"

wrapFetch = (url, opts) ->
  opts = merge {}, defs, opts
  {type} = opts

  res = await fetch url, opts

  if res.status >= 400
    throw new Error "Server responsed with status: #{res.status}"

  unless type of res
    throw new TypeError "
      Unknown response body type. Supports only these methods: 
      text, json, blob, arrayBuffer and formData.
    "

  unless type is "body"
    return await do res[type]

  return res

module.exports = wrapFetch
