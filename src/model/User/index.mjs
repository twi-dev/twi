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

User.belongsTo(Contacts, {
  as: "contacts",
  foreignKey: "contactsId",
  onDelete: "cascade",
  hooks: true
})

export default User
