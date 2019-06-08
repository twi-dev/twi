import updateAvatar from "graphql/resolve/mutation/user/updateAvatar"
import TFileInput from "graphql/input/media/TFileInput"
import TUser from "graphql/type/user/TUser"

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
