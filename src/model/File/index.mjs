import User from "model/User/User"

import File from "./File"

// Associations
File.hasOne(User)
User.belongsToMany(File)

export default File
