require "whatwg-fetch"

isPlainObject = require "lodash/isPlainObject"
isEmpty = require "lodash/isEmpty"
merge = require "lodash/merge"
toFormData = require "helper/util/stateToFormData"

defs =
  method: "GET"
  type: "json"
  credentials: "same-origin"
  headers:
    "X-Requested-With": "Fetch"

wrapFetch = (url, opts) ->
  opts = merge {}, defs, opts
  {type} = opts

  if isEmpty url
    throw new Error "Url cannot be empty"

  opts.body = toFormData opts.body unless isEmpty opts.body

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
