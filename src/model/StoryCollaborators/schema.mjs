import {DataTypes as t} from "sequelize"

const schema = {
  storyId: {
    type: t.INTEGER.UNSIGNED,
    allowNull: false
  },
  collaboratorId: {
    type: t.INTEGER.UNSIGNED,
    allowNull: false
  }
}

export default schema
