import {DataTypes as t} from "sequelize"

const schema = {
  id: {
    type: t.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: t.STRING,
    allowNull: false
  },
  description: t.TEXT,
  contentMd: {
    type: t.TEXT("medium"),
    allowNull: false
  },
  contentHtml: {
    type: t.TEXT("medium"),
    allowNull: false
  }
}

export default schema
