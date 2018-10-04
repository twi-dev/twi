import mongoose from "mongoose"
import isString from "lodash/isString"

import invariant from "@octetstream/invariant"

import config from "core/config"
import log from "core/log"

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

const address = getConnectionString(config.database)

const onConnected = () => (
  log.ok("MongoDB: Database connection established on %s", address)
)

/**
 * Establishes connection with configured MongoDB server
 *
 * @return {Promise<void>}
 */
const onDisconnected = () => log.ok("MongoDB: Disconnected from %s", address)

const connect = () => (
  mongoose.connect(address, {promiseLibrary: Promise, useNewUrlParser: true})
    .then(onConnected)
)

/**
 * Closes connection with MongoDB
 *
 * @return {Promise<void>}
 */
const disconnect = () => mongoose.disconnect().then(onDisconnected)

export default {connect, disconnect}
