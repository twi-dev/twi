import TViewer from "api/type/user/TViewer"

import remove from "api/resolve/mutation/user/avatarRemove"

const resolve = {
  type: TViewer,
  required: true,
  handler: remove
}

export {resolve}
