import "whatwg-fetch" // tmp

import {printAST} from "apollo-client"
import {
  HTTPFetchNetworkInterface
} from "apollo-client/transport/networkInterface"

import toFormData from "frontend/helper/util/toFormData"

class FormDataHTTPFetchNetworkInterface extends HTTPFetchNetworkInterface {
  fetchFromRemoteEndpoint(...args) {
    const [{request, options}] = args

    if (
      options.headers &&
      // FIXME: Remoe this code or find more universal way
      options.headers["Content-Type"] !== "multipart/from-data"
    ) {
      return super.fetchFromRemoteEndpoint(...args)
    }

    // Transform variables obj to FormData
    const fd = toFormData(request.variables, "variables")

    // Add specific GraphQL fields
    fd.append("operationName", request.operationName)
    fd.append("query", printAST(request.query))

    return fetch(this._uri, {
      ...this._opts,
      ...options,
      method: "POST",
      headers: {
        Accept: "*/*",
        ...options.headers,
      },
      body: fd
    })
  }
}

const createNetworkInterface = opts => (
  new FormDataHTTPFetchNetworkInterface(opts.uri, opts)
)

export {FormDataHTTPFetchNetworkInterface}
export default createNetworkInterface
