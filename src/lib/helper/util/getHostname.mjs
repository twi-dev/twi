const getProtocolName = secure => `http${secure ? "s" : ""}://`

const getLocalHostname = port => `http://localhost:${port}`

const getConfiguredHostname = (host = "localhost", secure) => (
  `${getProtocolName(secure)}${host}`
)

const getHostname = (host, port, secure, dev) => (
  dev ? getLocalHostname(port) : getConfiguredHostname(host, secure)
)

export default getHostname
