import {GraphQLString as TString} from "graphql"

import TInFile from "server/api/graphql/input/file/TInFile"
import TInContacts from "server/api/graphql/input/user/TInContacts"

import TUser from "server/api/graphql/type/user/TUser"

// import User from "server/api/model/User"

async function createUser(_, {login, email, password}) {
  return {
    userId: "foo",
    login,
    email,
    password,
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

const avatar = {
  type: TInFile,
  description: "Avatar for a user profile"
}

const contacts = {
  type: TInContacts
}

const args = {
  login, email, password, avatar, contacts
}

export {resolve, args}
