import User from "database/model/User"
import checkUser from "core/auth/checkUser"

const findViewer = (root, args, {state}) => User.findOneById(state.user.id)

export default checkUser(findViewer)
