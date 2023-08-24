import {z} from "zod"

export enum UserStatuses {
  Inactive = "inactive",
  Active = "active",
  Suspended = "suspended"
}

export const UserStatusesEnum = z.nativeEnum(UserStatuses)
