import {z} from "zod"

export enum UserRoles {
  OWNER = "owner",
  ADMIN = "admin",
  REGULAR = "regular"
}

export const UserRolesEnum = z.nativeEnum(UserRoles)
