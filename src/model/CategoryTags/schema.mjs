import {DataTypes as t} from "sequelize"

const schema = {
  categoryId: {
    type: t.INTEGER.UNSIGNED,
    allowNull: false
  },
  tagId: {
    type: t.INTEGER.UNSIGNED,
    allowNull: false
  }
}

export default schema
