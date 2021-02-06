import {Sequelize} from "sequelize"

import isEmpty from "lodash/isEmpty"
import omitBy from "lodash/omitBy"

const {
  DATABASE_HOST: host,
  DATABASE_PORT: port,
  DATABASE_USER: username,
  DATABASE_PASSWORD: password,
  DATABASE_NAME: database,
  DATABASE_DIALECT: dialect
} = process.env

const connection = new Sequelize(omitBy({
  dialect,
  host,
  port,
  database,
  username,
  password
}, isEmpty))

export default connection
