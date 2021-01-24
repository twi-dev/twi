import {DataTypes as t} from "sequelize"

import createSlug from "server/lib/helper/util/createSlug"

const schema = {
  id: {
    type: t.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  categoryId: t.INTEGER.UNSIGNED,
  name: {
    type: t.STRING,
    allowNull: false,
    unique: true,

    set(name) {
      this.setDataValue("name", name)
      this.setDataValue("slug", createSlug(name))
    }
  },
  slug: {
    type: t.STRING,
    allowNull: false,
    unique: true
  },
  description: t.STRING
}

export default schema
