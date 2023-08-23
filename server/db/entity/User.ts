import {Entity, Property, Enum} from "@mikro-orm/core"

import type {PickKeys} from "../../../lib/utils/types/PickKeys.js"
import {stringEnumValues} from "../../../lib/utils/stringEnumValues.js"

import {RecordSoft} from "./RecordSoft.js"

export enum UserRoles {
  OWNER = "owner",
  ADMIN = "admin",
  REGULAR = "regular"
}

export enum UserStatuses {
  INACTIVE = "inactive",
  ACTIVE = "active",
  SUSPENDED = "suspended"
}

// TODO: Add avatar field
@Entity()
export class User extends RecordSoft<UserOptionalFields> {
  @Property({type: "varchar", unique: true})
  login!: string

  /**
   * Email address (private),
   */
  @Property({type: "varchar", unique: true})
  email!: string

  /**
   * Password (will be hashed once the user is created & persisted).
   */
  @Property({type: "varchar"})
  password!: string

  /**
   * Indicates which role user were assigned to.
   */
  @Enum({type: "string", items: stringEnumValues(UserRoles)})
  role: UserRoles = UserRoles.REGULAR

  /**
   * Indecates user's account status.
   */
  @Enum({type: "string", items: stringEnumValues(UserStatuses)})
  status: UserStatuses = UserStatuses.INACTIVE
}

type UserOptionalFields = PickKeys<User, "role" | "status">
