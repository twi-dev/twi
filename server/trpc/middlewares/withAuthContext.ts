import {getToken, type JWT} from "next-auth/jwt"

import {unauthorized} from "../errors/unauthorized.js"
import {sessionToken} from "../../auth/cookies.js"
import {getORM} from "../../lib/db/orm.js"
import {User} from "../../db/entities.js"

import {withH3Context} from "./withH3Context.js"

export interface AuthContext {
  token: JWT
  user: User
}

export const withAuthContext = withH3Context.unstable_pipe(
  async ({ctx, next}) => {
    const token = await getToken({
      cookieName: sessionToken.name,
      req: ctx.event.node.req
    })

    if (!token) {
      unauthorized()
    }

    const orm = await getORM()
    const user = await orm.em.findOneOrFail(User, {id: token.sub}, {
      failHandler: unauthorized
    })

    const auth: AuthContext = {token, user}

    return next({ctx: {...ctx, auth}})
  }
)
