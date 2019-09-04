import Chapter from "model/Chapter"
import User from "model/User"
import File from "model/File"
import Tag from "model/Tag"

import StoryChapters from "model/StoryChapters"
import StoryTags from "model/StoryTags"

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

export default Story
