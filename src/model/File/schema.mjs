import {DataTypes as t} from "sequelize"

import mime from "mime-types"

import User from "model/User/User"

const schema = {
  id: {
    type: t.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: t.INTEGER,
    allowNull: false,
    field: "user_id",
    references: {
      model: User,
      key: "id"
    }
  },
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
