import Chapter from "model/Chapter/Chapter"
import User from "model/User/User"
import File from "model/File/File"

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
