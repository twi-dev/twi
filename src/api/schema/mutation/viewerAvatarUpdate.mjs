import update from "api/resolve/mutation/user/avatarUpdate"
import TFileInput from "api/input/common/TFileInput"
import TFile from "api/type/common/TFile"

const resolve = {
  type: TFile,
  required: true,
  handler: update,
  description: "Adds/Updates user's avatar."
}

const args = {
  image: TFileInput
}

export {resolve, args}
