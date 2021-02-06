import createPageType from "server/api/type/abstract/createPageType"

import TUser from "./TUser"

const TUserPage = createPageType({
  type: [TUser, true]
})

export default TUserPage
