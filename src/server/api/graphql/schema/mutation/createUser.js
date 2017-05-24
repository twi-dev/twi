// import TInContacts from "server/api/graphql/input/user/TInContacts"
import TUserInput from "server/api/graphql/input/user/TUserInput"
import TUser from "server/api/graphql/type/user/TUser"

import createUser from "server/api/graphql/resolve/mutation/user/createUser"

const resolve = {
  type: TUser,
  required: true,
  handler: createUser,
  description: (
    "This method will create a new user using basic information of him."
  )
}

// const contacts = {
//   type: TInContacts
// }

const user = {
  type: TUserInput,
  required: true
}

const args = {user}

export {resolve, args}
