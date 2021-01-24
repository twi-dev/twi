import {DataTypes as t} from "sequelize"

const schema = {
  id: {
    type: t.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: t.STRING,
    allowNull: false,
    unique: true
  },
  prefix: {
    type: t.STRING,
    unique: true,

    set(prefix) {
      if (prefix) {
        this.setDataValue("prefix", prefix.replace(/:/g, ""))
      }
    }
  },
  order: {
    type: t.INTEGER.UNSIGNED,
    allowNull: false
  }
}

export default schema
