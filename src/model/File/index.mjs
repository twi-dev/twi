import User from "model/User/User"

import File from "./File"

// Associations
User.hasOne(File, {foreignKey: "user_id", constrains: false})
File.belongsTo(User, {foreignKey: "user_id", constrains: false})

export default File
