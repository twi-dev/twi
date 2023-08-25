import {Entity, Property, Enum, Unique} from "@mikro-orm/core"

import type {PickKeys} from "../../../lib/utils/types/PickKeys.js"
import {stringEnumValues} from "../../../lib/utils/stringEnumValues.js"

import {UserStatuses} from "../../trpc/types/user/UserStatuses.js"
import {UserRoles} from "../../trpc/types/user/UserRoles.js"

import {RecordSoft} from "./RecordSoft.js"

// TODO: Add avatar field
@Entity()
export class User extends RecordSoft<UserOptionalProps> {
  /**
   * User unique human-readable identifier
   */
  @Property({type: "varchar"})
  @Unique()
  login!: string

  /**
   * Email address (private),
   */
  @Property({type: "varchar", hidden: true})
  @Unique()
  email!: string

  /**
   * Password (will be hashed once the user is created & persisted).
   */
  @Property({type: "varchar", hidden: true})
  password!: string

  /**
   * Indicates which role user were assigned to.
   */
  @Enum({type: "string", items: stringEnumValues(UserRoles)})
  role: UserRoles = UserRoles.Regular

  /**
   * Indecates user's account status.
   */
  @Enum({type: "string", items: stringEnumValues(UserStatuses)})
  status: UserStatuses = UserStatuses.Inactive
}

type UserOptionalProps = PickKeys<User, "role" | "status">
