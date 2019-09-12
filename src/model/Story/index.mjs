import Collaborator from "model/Collaborator"
import Chapter from "model/Chapter"
import User from "model/User"
import File from "model/File"
import Tag from "model/Tag"

import StoryTags from "model/StoryTags"

import Story from "./Story"

// Associations
Story.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "cascade",
  as: "publisher"
})

User.hasMany(Story, {foreignKey: "userId", as: "publisher"})

File.hasMany(Story, {foreignKey: "coverId", as: "cover"})
Story.belongsTo(File, {foreignKey: "coverId", as: "cover", onDelete: "cascade"})

Story.hasMany(Chapter, {foreignKey: "storyId"})
Chapter.belongsTo(Story, {foreignKey: "storyId", onDelete: "cascade"})

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

Story.hasMany(Collaborator, {foreignKey: "storyId"})
Collaborator.belongsTo(Story, {foreignKey: "storyId", onDelete: "cascade"})

export default Story
