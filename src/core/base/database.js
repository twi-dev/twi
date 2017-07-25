import mongoose from "mongoose"
import isString from "lodash/isString"

import invariant from "core/helper/util/invariant"

mongoose.Promise = Promise

function getConnectionSctring({host, port, name}) {
  invariant(host == null, "Host is required for a connection.")

  invariant(!isString(host), TypeError, "Host should be passed as a string.")

  invariant(name == null, "Database is required for a connection.")

  invariant(!isString(name), TypeError, "Database name should be a string.")

  let connectionSctring = "mongodb://"

  connectionSctring += host

  if (port && isString(port)) {
    connectionSctring += `:${port}`
  }

  connectionSctring += `/${name}`

  return connectionSctring
}

async function createConnection(config = {}) {
  const replicaUri = getConnectionSctring(config)

  return await mongoose.connect(replicaUri, {
    useMongoClient: true,
    promiseLibrary: Promise
  })
}

export default createConnection
