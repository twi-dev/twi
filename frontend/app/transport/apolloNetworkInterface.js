import "whatwg-fetch" // tmp

import {printAST} from "apollo-client"
import {
  HTTPFetchNetworkInterface
} from "apollo-client/transport/networkInterface"

import toFormData from "frontend/core/helper/util/toFormData"

class FormDataHTTPFetchNetworkInterface extends HTTPFetchNetworkInterface {
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

const createNetworkInterface = opts => (
  new FormDataHTTPFetchNetworkInterface(opts.uri, opts)
)

export {FormDataHTTPFetchNetworkInterface}
export default createNetworkInterface
