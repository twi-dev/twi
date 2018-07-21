import mongoose from "mongoose"
import isString from "lodash/isString"

import invariant from "@octetstream/invariant"

import config from "core/config"

const {host, port, name} = config.database

mongoose.Promise = Promise

let instance = null

function getConnectionString() {
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

const closeConnection = () => instance.connections.map(conn => conn.close())

async function createConnection() {
  instance = await mongoose.connect(getConnectionString(), {
    promiseLibrary: Promise,
    useNewUrlParser: true
  })

  return instance
}

export default createConnection

export {createConnection, closeConnection}
