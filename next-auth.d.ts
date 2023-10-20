import "next-auth"

import type {OUserSessionOutput} from "./server/trpc/valibot/user/UserSessionOutput.js"

declare module "next-auth" {
  interface User extends OUserSessionOutput { }

  interface Session {
    login: string
    user: User
  }
}
