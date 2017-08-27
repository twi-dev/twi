import TViewer from "graphql/type/user/TViewer"
import findViewer from "graphql/resolve/query/user/findViewer"

const resolve = {
  type: TViewer,
  required: true,
  handler: findViewer,
  description: "Show information about logged in user."
}

export {resolve}
