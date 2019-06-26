import TFileInput from "api/input/common/TFileInput"
import TViewer from "api/type/user/TViewer"

import updateAvatar from "api/resolve/mutation/user/updateAvatar"

const resolve = {
  type: TViewer,
  required: true,
  handler: updateAvatar
}

const args = {
  file: TFileInput
}

export {resolve, args}
