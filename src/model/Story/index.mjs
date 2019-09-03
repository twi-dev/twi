import Chapter from "model/Chapter/Chapter"
import User from "model/User/User"
import File from "model/File/File"

import StoryChapters from "model/StoryChapters"

import Story from "./Story"

// Associations
Story.hasOne(User, {foreignKey: "userId", as: "publisher"})

Story.hasOne(File, {foreignKey: "coverId", as: "cover"})

Story.belongsToMany(Chapter, {
  foreignKey: "storyId",
  constraints: false,
  through: {
    model: StoryChapters
  }
})

Chapter.belongsToMany(Story, {
  foreignKey: "chapterId",
  constraints: false,
  through: {
    model: StoryChapters
  }
})

export default Story
