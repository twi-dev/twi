import Client from "apollo-client"

import NetworkInterface from "./network-interface/FormDataHTTPNetworkInterface"

const networkInterface = new NetworkInterface({
  url: "http://localhost:1337/graphql" // Should be configurable
})

const client = new Client({networkInterface})

export default client
