import File from "model/File/File"
import Contacts from "model/Contacts/Contacts"

import User from "./User"

// Associations
User.hasOne(File)
File.belongsTo(User)

User.hasOne(Contacts)
Contacts.belongsTo(User)

export default User
