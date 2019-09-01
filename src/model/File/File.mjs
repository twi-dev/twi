import {join} from "path"

import {unlink} from "promise-fs"
import {Model, DataTypes as t} from "sequelize"

// import format from "date-fns/format"
import mimes from "mime-types"

import readOnly from "core/helper/decorator/readOnly"

import User from "model/User"

class File extends Model {
  @readOnly static root = join(__dirname, "..", "..", "static", "file")

  static async create(file, options) {
    return super.create(file, options)
  }

  unlink(options) {
    return unlink(join(File.root, this.path)).then(() => this.destroy(options))
  }
}

File.init({
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
        if (!mimes.lookup(value)) {
          throw new Error("Invalid mime type.")
        }
      }
    }
  },
  size: {
    type: t.INTEGER,
    allowNull: false,
    comment: "File size in bytes"
  },
  createdAt: {
    type: t.DATE,
    allowNull: false,
    default: t.NOW,
    field: "created_at"
  },
  updatedAt: {
    type: t.DATE,
    default: null,
    field: "updated_at"
  }
})

// Associations
File.hasOne(User, "creator")
User.belongsToMany(File)

export default File
