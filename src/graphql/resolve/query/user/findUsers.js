import User from "database/model/User"

const findUsers = (_, {cursor}) => User.findMany(cursor)

export default findUsers
