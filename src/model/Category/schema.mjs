import {DataTypes as t} from "sequelize"

import BadRequest from "core/error/http/BadRequest"

const COLOR_EXPR = /^[0-9a-f]{6}$/

const schema = {
  id: {
    type: t.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: t.STRING,
    allowNull: false
  },
  prefix: {
    type: t.STRING,
    unique: true,
    comment: "Prefix that is used to match category to where a tag belongs."
  },
  order: {
    type: t.INTEGER.UNSIGNED,
    allowNull: false,
    unique: true
  },
  color: {
    type: t.CHAR(6),
    allowNull: false,
    validate: {
      isValid(value) {
        if (COLOR_EXPR.test(value)) {
          throw new BadRequest("Invalid color format.")
        }
      }
    }
  }
}

export default schema
