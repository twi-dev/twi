fetch = require "whatwg-fetch"
{merge} = require "lodash"

defs =
  method: "GET"
  type: "json"
  credentials: "same-origin"
  headers:
    "X-Requested-With": "Fetch"

wrapFetch = (url, opts) -> new Promise (resolve, reject) ->
  opts = merge opts, defs
  {type} = opts

  onFulfilled = (res) -> resolve res

  onRejected = (err) -> reject err

  onResponsed = (res) ->
    return onFulfilled res if type is "body"

    unless opts.type of res
      return onRejected new TypeError "
        Unknown response body type. Supports only these methods: 
        text, json, blob, arrayBuffer and formData.
      "


    __fulfill = do res[type]

    __fulfill
      .then  onFulfilled
      .catch onRejected

  fetch url, opts
    .then onResponsed, onRejected

module.exports = wrapFetch
