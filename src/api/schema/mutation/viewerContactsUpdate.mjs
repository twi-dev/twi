import update from "api/resolve/mutation/user/contactsUpdate"
import TViewer from "api/type/user/TViewer"

const resolve = {
  type: TViewer,
  required: true,
  handler: update
}

export {resolve}
