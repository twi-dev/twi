import type {AuthOptions} from "next-auth"

import {AuthSecret} from "./types/AuthSecret.js"

import * as providers from "./providers.js"

export const config: AuthOptions = {
  secret: AuthSecret.parse(process.env.AUTH_SECRET),
  pages: {
    signIn: "/auth/login"
  },
  providers: Object.values(providers)
}
