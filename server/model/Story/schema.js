import {DataTypes as t} from "sequelize"

const schema = {
  id: {
    type: t.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  publisherId: {
    type: t.INTEGER.UNSIGNED,
    allowNull: false
  },
  coverId: t.INTEGER.UNSIGNED,
  title: {
    type: t.STRING,
    allowNull: false
  },
  description: {
    type: t.TEXT,
    allowNull: false
  },
  originalAuthorName: t.STRING,
  originalTitle: t.STRING,
  originalUrl: t.STRING,
  isDraft: {
    type: t.BOOLEAN,
    defaultValue: true
  },
  isFinished: {
    type: t.BOOLEAN,
    defaultValue: false,

    set(flag) {
      const chaptersCount = this.getDataValue("chaptersCount")

      this.setDataValue("isFinished", chaptersCount > 0 ? flag : false)
    }
  },
  chaptersCount: {
    type: t.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  }
}

export default schema
