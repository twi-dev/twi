import {z} from "zod"

import {UserRolesEnum} from "./UserRoles.js"
import {UserStatusesEnum} from "./UserStatuses.js"

export const UserStats = z.object({
  status: UserStatusesEnum,
  role: UserRolesEnum
})

export type IUserStats = z.input<typeof UserStats>

export type OUserStats = z.output<typeof UserStats>
