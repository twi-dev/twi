import {closeConnection} from "../lib/db/orm.js"

/**
 * Closes database connection once Nitro server stops
 */
export default defineNitroPlugin(nitro => {
  nitro.hooks.hookOnce("close", closeConnection)
})
