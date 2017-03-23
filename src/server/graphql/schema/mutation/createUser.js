import {GraphQLString as TString} from "graphql"

import TUser from "server/graphql/type/user/TUser"

async function createUser(_, {login, email, password}) {
  return {
    userId: "foo",
    login: "OctetStream",
    role: {
      name: "root",
      code: 0
    }
  }
}

const setResover = resolve => (
  resolve(TUser, "Create a new user", createUser)
    .arg("login", TString, true)
    .arg("email", TString, true)
    .arg("password", TString, true)
)

export default setResover
