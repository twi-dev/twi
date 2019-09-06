import TViewer from "api/type/user/TViewer"

import removeAvatar from "api/resolve/mutation/user/removeAvatar"

const resolve = {
  type: TViewer,
  required: true,
  handler: removeAvatar
}

export {resolve}
