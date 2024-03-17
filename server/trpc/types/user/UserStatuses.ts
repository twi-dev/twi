import {enum_} from "valibot"

export enum UserStatuses {
  Inactive = "inactive",
  Active = "active",
  Suspended = "suspended"
}

export const UserStatusesEnum = enum_(UserStatuses)
