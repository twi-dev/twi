import User from "model/User/User"

import Session from "./Session"

// Associations
Session.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
  onDelete: "cascade"
})

export default Session
