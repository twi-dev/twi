import {Model, DataTypes as t} from "sequelize"

import User from "model/User"
import File from "model/File"

class Story extends Model {
  get isTranslation() {
    const {originalAuthor, originalTitle, originalUrl} = this

    return Boolean(originalAuthor && originalTitle && originalUrl)
  }
}

Story.init({
  id: {
    type: t.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: t.INTEGER,
    allowNull: false,
    field: "user_id",
    comment: "Story publisher.",
    references: {
      model: User,
      key: "id"
    }
  },
  coverId: {
    type: t.INTEGER,
    field: "cover_id",
    references: {
      model: File,
      key: "id"
    }
  },
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
  createdAt: {
    type: t.DATE,
    allownull: false,
    default: t.NOW
  },
  updatedAt: {
    type: t.DATE,
    field: "updated_at"
  },
  isDraft: {
    type: t.BOOLEAN,
    default: true,
    field: "is_draft"
  },
  isFinished: {
    type: t.BOOLEAN,
    default: false,
    field: "is_finished"
  }
})

// Associations
Story.hasOne(User)
User.belongsToMany(Story)

Story.hasOne(File)
File.belongsTo(Story)

export default Story
