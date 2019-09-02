import Contacts from "model/Contacts/Contacts"
import File from "model/File/File"

import User from "./User"

// Associations
File.hasOne(User, {foreignKey: "avatar_id"})
User.belongsTo(File, {foreignKey: "avatar_id"})

Contacts.hasOne(User, {foreignKey: "contacts_id"})
User.belongsTo(Contacts, {foreignKey: "contacts_id"})

export default User
