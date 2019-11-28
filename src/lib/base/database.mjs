import connection from "lib/db/connection"
import log from "lib/log"

const onConnected = () => (
  log.ok("Database connection established.")
)

/**
 * Establishes connection with configured MongoDB server
 *
 * @return {Promise<void>}
 */
const onDisconnected = () => log.ok("Disconnected from database")

const connect = () => connection.sync().then(onConnected)

/**
 * Closes connection with MongoDB
 *
 * @return {Promise<void>}
 */
const disconnect = () => connection.close().then(onDisconnected)

export default {connect, disconnect}
