import User from "model/User/User"

import Session from "./Session"

// Associations
Session.belongsTo(User, {
  as: "user",
  foreignKey: "user_id",
  onDelete: "cascade"
})

export default Session
