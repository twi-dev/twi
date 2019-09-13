import TUserPasswordUpdateInput from "api/input/user/TUserPasswordUpdateInput"
import update from "api/resolve/mutation/user/passwordUpdate"
import TViewer from "api/type/user/TViewer"

const resolve = {
  type: TViewer,
  required: true,
  handler: update
}

const args = {
  password: [TUserPasswordUpdateInput, true]
}

export {resolve, args}
