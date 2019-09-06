import {DataTypes as t} from "sequelize"

const schema = {
  id: {
    type: t.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: t.INTEGER.UNSIGNED,
    allowNull: false
  },
  title: {
    type: t.STRING,
    allowNull: false
  },
  description: {
    type: t.TEXT,
    allowNull: false
  },
  originalAuthor: t.STRING,
  originalTitle: t.STRING,
  originalUrl: t.STRING,
  isDraft: {
    type: t.BOOLEAN,
    defaultValue: true
  },
  isFinished: {
    type: t.BOOLEAN,
    defaultValue: false
  }
}

export default schema
