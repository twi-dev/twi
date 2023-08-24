import {z} from "zod"

export enum UserRoles {
  Owner = "owner",
  Admin = "admin",
  Regular = "regular"
}

export const UserRolesEnum = z.nativeEnum(UserRoles)
