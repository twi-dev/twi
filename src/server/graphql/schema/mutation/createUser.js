import {GraphQLString as TString} from "graphql"

import TUser from "server/graphql/type/user/TUser"

async function createUser(_, {login, email, password}) {
  return {
    userId: "foo",
    login,
    email,
    role: {
      name: "root",
      code: 0
    }
  }
}

const resolve = {
  type: TUser,
  required: true,
  handler: createUser,
  description: (
    "This method will create a new user using basic information of him."
  )
}

const login = {
  type: TString,
  required: true
}

const email = {
  type: TString,
  required: true
}

const password = {
  type: TString,
  required: true
}

const args = {login, email, password}

export {resolve, args}
