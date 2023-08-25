import {parseCookies} from "#imports"

import {getToken, type JWT} from "next-auth/jwt"

import {unauthorized} from "../errors/unauthorized.js"
import {sessionToken} from "../../auth/cookies.js"
import {config} from "../../auth/config.js"
import {getORM} from "../../lib/db/orm.js"
import {User} from "../../db/entities.js"

import {withH3Context} from "./withH3Context.js"

export interface AuthContext {
  token: JWT
  user: User
}

/**
 * Fake NextApiRequest look-a-like interface because we don't actualyy have Next.js types in Nuxt project.
 */
interface NextApiRequest {
  cookies: Record<string, string>
  headers: Headers
}

export const withAuthContext = withH3Context.unstable_pipe(
  async ({ctx, next}) => {
    const token = await getToken({
      secureCookie: sessionToken.options.secure,
      secret: config.secret,
      cookieName: sessionToken.name,
      req: {
        cookies: parseCookies(ctx.event),
        headers: ctx.event.headers
      } as unknown as NextApiRequest // Pass fake NextApiRequest so `getToken` will parse JWT token from cookies
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
