import Collaborator from "model/Collaborator"
import Chapter from "model/Chapter"
import User from "model/User"
import File from "model/File"
import Tag from "model/Tag"

import StoryTags from "model/StoryTags"
import StoryChapters from "model/StoryChapters"
import StoryCollaborators from "model/StoryCollaborators"

import Story from "./Story"

// Associations
Story.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "cascade",
  as: "publisher"
})

Story.belongsTo(File, {foreignKey: "coverId", as: "cover", onDelete: "cascade"})

Story.belongsToMany(Chapter, {
  foreignKey: "storyId",
  through: {
    model: StoryChapters
  }
})

Chapter.belongsToMany(Story, {
  foreignKey: "chapterId",
  through: {
    model: StoryChapters
  }
})

Story.belongsToMany(Tag, {
  foreignKey: "storyId",
  through: {
    model: StoryTags
  }
})

Tag.belongsToMany(Story, {
  foreignKey: "tagId",
  through: {
    model: StoryTags
  }
})

Story.belongsToMany(Collaborator, {
  foreignKey: "storyId",
  through: {
    model: StoryCollaborators
  }
})

Collaborator.belongsToMany(Story, {
  foreignKey: "collaboratorId",
  through: {
    model: StoryCollaborators
  }
})

export default Story
