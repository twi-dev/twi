import User from "model/User/User"

import File from "./File"

// Associations
User.hasOne(File, {foreignKey: "user_id"})
File.belongsToMany(User, {foreighKey: "user_id"})

export default File
