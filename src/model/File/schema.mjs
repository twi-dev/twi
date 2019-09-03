import {DataTypes as t} from "sequelize"

import mime from "mime-types"

const schema = {
  path: {
    type: t.STRING,
    allowNull: false
  },
  hash: {
    type: t.STRING(128),
    allowNull: false
  },
  mime: {
    type: t.STRING,
    allowNull: false,
    validate: {
      isMime(value) {
        if (!mime.lookup(value)) {
          throw new Error("Invalid mime type.")
        }
      }
    }
  },
  size: {
    type: t.INTEGER,
    allowNull: false,
    comment: "File size in bytes"
  }
}

export default schema
