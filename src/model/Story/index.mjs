import User from "model/User/User"
import File from "model/File/File"
import Chapter from "model/Chapter/Chapter"

import StoryChapters from "model/StoryChapters"

import Story from "./Story"

// Associations
Story.hasOne(User)
User.belongsToMany(Story)

Story.hasOne(File)
File.belongsTo(Story)

Story.belongsToMany(Chapter, {
  foreignKey: "storyId",
  constraints: false,
  through: {
    model: StoryChapters,
    scope: "chapters"
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
