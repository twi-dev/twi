import updateAvatar from "../../resolve/mutation/user/updateAvatar"
import TFileInput from "../../input/media/TFileInput"
import TUser from "../../type/user/TUser"

const resolve = {
  type: TUser,
  required: true,
  handler: updateAvatar,
  description: "Update the current user avatar."
}

const args = {
  image: TFileInput
}

export {resolve, args}
