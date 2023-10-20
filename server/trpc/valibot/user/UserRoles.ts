import {nativeEnum} from "valibot"

export enum UserRoles {
  Owner = "owner",
  Admin = "admin",
  Regular = "regular"
}

export const UserRolesEnum = nativeEnum(UserRoles)
