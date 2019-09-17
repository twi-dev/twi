import Contacts from "model/Contacts"
import File from "model/File"

import User from "./User"

// Associations
User.belongsTo(File, {
  as: "avatar",
  foreignKey: "avatarId",
  onDelete: "cascade",
  hooks: true
})

User.hasOne(Contacts, {foreignKey: "userId"})
Contacts.belongsTo(User, {
  as: "contacts",
  foreignKey: "userId",
  onDelete: "cascade"
})

export default User
