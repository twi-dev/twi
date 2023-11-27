import type {AuthOptions} from "next-auth"
import {parse} from "valibot"

import {AuthSecret} from "./types/AuthSecret.js"

import * as callbacks from "./callbacks.js"
import * as providers from "./providers.js"
import * as cookies from "./cookies.js"

export const config: AuthOptions = {
  secret: parse(AuthSecret, process.env.AUTH_SECRET),
  providers: Object.values(providers),
  cookies,
  callbacks,
  pages: {
    signIn: "/auth/login"
  }
}
