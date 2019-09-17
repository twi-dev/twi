import update from "api/resolve/mutation/user/contactsUpdate"
import TUser from "api/type/user/TUser"

const resolve = {
  type: TUser,
  required: true,
  handler: update
}

export {resolve}
