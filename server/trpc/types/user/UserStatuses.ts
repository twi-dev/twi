import {z} from "zod"

export enum UserStatuses {
  INACTIVE = "inactive",
  ACTIVE = "active",
  SUSPENDED = "suspended"
}

export const UserStatusesEnum = z.nativeEnum(UserStatuses)
