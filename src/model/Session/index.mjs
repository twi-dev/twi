import User from "model/User/User"

import Session from "./Session"

// Associations
Session.hasOne(User)
User.belongsToMany(Session)
