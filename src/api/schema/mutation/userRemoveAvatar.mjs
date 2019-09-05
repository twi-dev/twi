import remove from "api/resolve/mutation/user/removeAvatar"
import TUser from "api/type/user/TUser"

const resolve = {
  type: TUser,
  required: true,
  handler: remove
}

export {resolve}
