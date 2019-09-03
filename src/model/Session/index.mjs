import User from "model/User/User"

import Session from "./Session"

// Associations
// User.hasMany(Session, {foreignKey: "user_id", onDelete: "cascade"})
Session.belongsTo(User, {foreignKey: "user_id", onDelete: "cascade"})

export default Session
