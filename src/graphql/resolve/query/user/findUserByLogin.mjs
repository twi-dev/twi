import bind from "core/graphql/bindResolver"
import User from "db/model/User"

const findUserByLogin = ({args}) => User.findOne({login: args.login})

export default bind(findUserByLogin)
