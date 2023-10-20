import {nativeEnum} from "valibot"

export enum UserStatuses {
  Inactive = "inactive",
  Active = "active",
  Suspended = "suspended"
}

export const UserStatusesEnum = nativeEnum(UserStatuses)
