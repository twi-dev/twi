import type {AuthOptions} from "next-auth"

import {AuthSecret} from "./types/AuthSecret.js"

import * as providers from "./providers.js"
import * as cookies from "./cookies.js"

export const config: AuthOptions = {
  secret: AuthSecret.parse(process.env.AUTH_SECRET),
  providers: Object.values(providers),
  cookies,
  pages: {
    signIn: "/auth/login"
  }
}
