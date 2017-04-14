import {isDev} from "./configure"

const getProtocolName = secure => `http${secure ? "s" : ""}://`

const getLocalHostname = port => `http://localhost:${port}`

const getConfiguredHostname = (host, secure) => (
  `${getProtocolName(secure)}${host}`
)

const getHostname = (host, port, secure) => (
  isDev ? getLocalHostname(port) : getConfiguredHostname(host, secure)
)

export {
  getConfiguredHostname,
  getLocalHostname
}

export default getHostname
