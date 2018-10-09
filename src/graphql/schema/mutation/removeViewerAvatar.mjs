import removeAvatar from "../../resolve/mutation/user/removeAvatar"
import TUser from "../../type/user/TUser"

const resolve = {
  type: TUser,
  required: true,
  handler: removeAvatar,
  description: "Remove the current user avatar."
}

export {resolve}
