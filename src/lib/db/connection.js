import Sequelize from "sequelize"

import config from "lib/base/config"

const {
  name: database, user: username, pass: password, ...options
} = config.database

/**
 * @const
 *
 * @type {import("sequelize").Sequelize}
 */
const connection = new Sequelize({...options, database, username, password})

export default connection
