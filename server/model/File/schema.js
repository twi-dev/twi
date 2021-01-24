import {DataTypes as t} from "sequelize"

import mime from "mime-types"

const schema = {
  id: {
    type: t.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  path: {
    type: t.TEXT,
    allowNull: false
  },
  hash: {
    type: t.CHAR(128),
    allowNull: false,
    comment: "SHA512 hash"
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
    type: t.INTEGER.UNSIGNED,
    allowNull: false,
    comment: "File size in bytes"
  }
}

export default schema
