import fetch from "isomorphic-fetch"

import {printAST, HTTPFetchNetworkInterface} from "apollo-client"

import toFormData from "frontend/helper/util/toFormData"

class FormDataHTTPNetworkInterface extends HTTPFetchNetworkInterface {
  constructor(options = {}) {
    const url = options.url

    delete options.url

    super(url, options)
  }

  fetchFromRemoteEndpoint({request, options}) {
    // Transform variables obj to FormData
    const body = toFormData(request.variables, "variables")

    // Add specific GraphQL fields
    body.append("operationName", request.operationName)
    body.append("query", printAST(request.query))

    return fetch(this._uri, {
      ...this._opts,
      ...options,
      method: "POST",
      headers: {
        Accept: "*/*",
        ...options.headers,
      },
      body
    })
  }
}

export default FormDataHTTPNetworkInterface
