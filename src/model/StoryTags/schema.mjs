import {DataTypes as t} from "sequelize"

const schema = {
  storyId: {
    type: t.INTEGER.UNSIGNED,
    allowNull: false,
    field: "story_id"
  },
  tagId: {
    type: t.INTEGER.UNSIGNED,
    allowNull: false,
    field: "tag_id"
  }
}

export default schema
