const getClient = session => ({
  ip: session.clientIp,
  os: {
    name: session.clientOsName,
    version: session.clientOsVersion
  },
  browser: {
    name: session.clientBrowserName,
    version: session.clientBrowserVersion
  }
})

export default getClient
