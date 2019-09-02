import User from "model/User/User"

import Session from "./Session"

// Associations
User.hasMany(Session, {foreignKey: "user_id"})
Session.belongsTo(User, {foreignKey: "user_id"})
