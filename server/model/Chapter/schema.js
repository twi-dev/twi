import {DataTypes as t} from "sequelize"

const schema = {
  id: {
    type: t.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  storyId: {
    type: t.INTEGER.UNSIGNED,
    allowNull: false
  },
  order: {
    type: t.INTEGER.UNSIGNED,
    allowNull: false
  },
  title: {
    type: t.STRING,
    allowNull: false
  },
  description: t.TEXT,
  content: {
    type: t.TEXT("medium"),
    allowNull: false
  },
  isDraft: {
    type: t.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
}

export default schema
