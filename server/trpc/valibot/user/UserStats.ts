import type {Input, Output} from "valibot"
import {object} from "valibot"

import {UserRolesEnum} from "./UserRoles.js"
import {UserStatusesEnum} from "./UserStatuses.js"

export const UserStats = object({
  status: UserStatusesEnum,
  role: UserRolesEnum
})

export type IUserStats = Input<typeof UserStats>

export type OUserStats = Output<typeof UserStats>
