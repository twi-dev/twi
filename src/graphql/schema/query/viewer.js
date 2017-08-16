import TUser from "graphql/type/user/TUser"
import findViewer from "graphql/resolve/query/user/findViewer"

const resolve = {
  type: TUser,
  required: true,
  handler: findViewer,
  description: "Show information about logged in user."
}

export {resolve}
