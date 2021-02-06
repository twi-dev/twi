import Chapter from "server/model/Chapter"
import User from "server/model/User"
import File from "server/model/File"
import Tag from "server/model/Tag"

import StoryTags from "server/model/StoryTags"

import Story from "./Story"

// Associations
Story.belongsTo(User, {
  foreignKey: "publisherId",
  onDelete: "cascade",
  as: "publisher"
})

User.hasMany(Story, {foreignKey: "publisherId"})

File.hasMany(Story, {foreignKey: "coverId"})
Story.belongsTo(File, {foreignKey: "coverId", as: "cover", onDelete: "cascade"})

Story.hasMany(Chapter, {foreignKey: "storyId"})
Chapter.belongsTo(Story, {
  foreignKey: "storyId",
  onDelete: "cascade",
  as: "story"
})

Story.belongsToMany(Tag, {
  as: "tags",
  foreignKey: "storyId",
  through: {
    model: StoryTags
  }
})

Tag.belongsToMany(Story, {
  as: "stories",
  foreignKey: "tagId",
  through: {
    model: StoryTags
  }
})

export default Story
