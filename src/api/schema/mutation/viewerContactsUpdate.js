import update from "api/resolve/mutation/user/contactsUpdate"
import TViewer from "api/type/user/TViewer"

const resolve = {
  type: TViewer,
  required: true,
  handler: update,
  descriptiob: "Updates user's contacts information."
}

export {resolve}
