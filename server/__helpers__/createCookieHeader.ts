import {encode} from "next-auth/jwt"

import type {User} from "../db/entities.js"

import {sessionToken} from "../lib/auth/cookies.js"
import {config} from "../lib/auth/config.js"

import {createChunkedCookie} from "./createChunkedCookie.js"

export async function createCookieHeader(user: User): Promise<Headers> {
  const headers = new Headers()

  const token = await encode({
    token: {
      sub: user.id,
      session: {
        user: {
          id: user.id,
          email: null,
          name: null,
          image: null
        }
      }
    },
    secret: config.secret!
  })

  const cookies = createChunkedCookie({
    options: sessionToken.options,
    name: sessionToken.name,
    value: token
  })

  for (const {name, value} of cookies) {
    headers.append("cookie", `${name}=${value}`)
  }

  return headers
}
