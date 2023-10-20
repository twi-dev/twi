import type {CallbacksOptions} from "next-auth"
import {parseAsync} from "valibot"

import {UserSessionOutput} from "../../../trpc/valibot/user/UserSessionOutput.js"
import {getORM} from "../../db/orm.js"
import {User} from "../../../db/entities.js"

export type SessionCallback = CallbacksOptions["session"]

export const session: SessionCallback = async ({session, token}) => {
  const orm = await getORM()

  const user = await orm.em.findOne(User, {id: token.sub}, {
    disableIdentityMap: true
  })

  // TODO: Throw specific error type
  if (!user) {
    throw new Error("Unable to find user.")
  }

  return {
    ...session, user: await parseAsync(UserSessionOutput, user)
  }
}
