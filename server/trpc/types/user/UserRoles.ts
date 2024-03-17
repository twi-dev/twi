import {enum_} from "valibot"

export enum UserRoles {
  Owner = "owner",
  Admin = "admin",
  Regular = "regular"
}

export const UserRolesEnum = enum_(UserRoles)
