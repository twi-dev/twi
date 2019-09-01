import {DataTypes as t} from "sequelize"

import BadRequest from "core/error/http/BadRequest"

const COLOR_EXPR = /^[0-9a-f]{6}$/

const schema = {
  name: {
    type: t.STRING,
    allowNull: false
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
