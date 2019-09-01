import User from "model/User/User"
import File from "model/File/File"

import Story from "./Story"

// Associations
Story.hasOne(User)
User.belongsToMany(Story)

Story.hasOne(File)
File.belongsTo(Story)

export default Story
