import File from "server/model/File"

import User from "./User"

// Associations
User.belongsTo(File, {
  as: "avatar",
  foreignKey: "avatarId",
  onDelete: "cascade",
  hooks: true
})

export default User
