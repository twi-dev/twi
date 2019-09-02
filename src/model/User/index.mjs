import Contacts from "model/Contacts"
import File from "model/File"

import User from "./User"

// Associations
File.hasOne(User, {foreignKey: "avatar_id", constraints: false})
User.belongsTo(File, {foreignKey: "avatar_id", constraints: false})

Contacts.hasOne(User, {foreignKey: "contacts_id"})
User.belongsTo(Contacts, {foreignKey: "contacts_id"})

export default User
