import {DataTypes as t} from "sequelize"

const schema = {
  title: {
    type: t.STRING,
    allowNull: false
  },
  desctiontion: {
    type: t.TEXT,
    allowNull: false
  },
  originalAuthor: {
    type: t.STRING,
    field: "original_author"
  },
  originalTitle: {
    type: t.STRING,
    field: "original_title"
  },
  originalUrl: {
    type: t.STRING,
    field: "original_url"
  },
  isDraft: {
    type: t.BOOLEAN,
    default: true,
    field: "is_draft",

    set(value) {
      const isFinished = this.getDataValue("isFinished")

      // This field's value can be updated with given value only when
      // the story marked as finished.
      this.setDataValue("isDraft", isFinished === true ? value : false)
    }
  },
  isFinished: {
    type: t.BOOLEAN,
    default: false,
    field: "is_finished"
  }
}

export default schema
