import mongoose from "mongoose"
import isString from "lodash/isString"

import invariant from "@octetstream/invariant"

mongoose.Promise = Promise

function getConnectionString({host, port, name}) {
  invariant(host == null, "Host is required for a connection.")

  invariant(!isString(host), TypeError, "Host should be passed as a string.")

  invariant(name == null, "Database is required for a connection.")

  invariant(!isString(name), TypeError, "Database name should be a string.")

  let connectionString = "mongodb://"

  connectionString += host

  if (port) {
    connectionString += `:${port}`
  }

  connectionString += `/${name}`

  return connectionString
}

async function createConnection(config = {}) {
  const connectionString = getConnectionString(config)

  return await mongoose.connect(connectionString, {
    useMongoClient: true,
    promiseLibrary: Promise
  })
}

export default createConnection
