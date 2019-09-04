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
  desctiontion: {
    type: t.TEXT,
    allowNull: false
  },
  originalAuthor: t.STRING,
  originalTitle: t.STRING,
  originalUrl: t.STRING,
  isDraft: {
    type: t.BOOLEAN,
    defaultValue: true,

    set(value) {
      const isFinished = this.getDataValue("isFinished")

      // This field's value can be updated with given value only when
      // the story marked as finished.
      this.setDataValue("isDraft", isFinished === true ? value : false)
    }
  },
  isFinished: {
    type: t.BOOLEAN,
    defaultValue: false
  }
}

export default schema
