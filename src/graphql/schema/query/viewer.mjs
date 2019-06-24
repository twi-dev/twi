import TViewer from "graphql/type/user/TViewer"
import viewer from "graphql/resolve/query/user/viewer"

const resolve = {
  type: TViewer,
  required: true,
  handler: viewer,
  description: "Show information about logged in user."
}

export {resolve}
