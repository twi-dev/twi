import "next-auth"

import type {OUserSessionOutput} from "./server/trpc/types/user/UserSessionOutput.js"

declare module "next-auth" {
  interface User extends OUserSessionOutput { }

  interface Session {
    login: string
    user: User
  }
}
