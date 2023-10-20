import {safeParseAsync, parseAsync} from "valibot"

import createCredentialsProvider from "next-auth/providers/credentials"

import {UserLogInInput} from "../../../trpc/types/user/UserLogInInput.js"
import {UserOutput} from "../../../trpc/types/user/UserOutput.js"
import {comparePassword} from "../../utils/password.js"
import {getORM} from "../../db/orm.js"
import {User} from "../../../db/entities.js"

export const credentials = createCredentialsProvider({
  name: "credentials",
  credentials: {
    email: {
      label: "Email",
      type: "email"
    },
    password: {
      label: "Password",
      type: "password"
    }
  },
  async authorize(credentials) {
    const result = await safeParseAsync(UserLogInInput, credentials)

    if (!result.success) {
      return null
    }

    const {login, password} = result.data

    const orm = await getORM()
    const user = await orm.em.findOne(User, {login}, {
      disableIdentityMap: true
    })

    // TODO: Use http errors insead of generic Error object
    if (!user) {
      throw new Error("Can't find a user")
    }

    // TODO: Use http errors insead of generic Error object
    if (await comparePassword(password, user.password) === false) {
      throw new Error("Invalid password")
    }

    // Serialize user with zod
    return parseAsync(UserOutput, user)
  }
})
