import {Entity, Property, Enum, Unique, OneToOne} from "@mikro-orm/core"

import type {PickKeys} from "../../../lib/utils/types/PickKeys.js"
import type {MaybeNull} from "../../..//lib/utils/types/MaybeNull.js"
import {stringEnumValues} from "../../../lib/utils/stringEnumValues.js"

import {UserStatuses} from "../../trpc/types/user/UserStatuses.js"
import {UserRoles} from "../../trpc/types/user/UserRoles.js"

import {RecordSoft} from "./RecordSoft.js"
import {File} from "./File.js"

// TODO: Add avatar field
@Entity()
export class User extends RecordSoft<UserOptionalProps> {
  @Property({type: "varchar", nullable: true, default: null})
  displayName: MaybeNull<string> = null

  /**
   * User unique human-readable identifier
   */
  @Property({type: "varchar"})
  @Unique()
  login!: string

  /**
   * Email address (private),
   */
  @Property({type: "varchar"})
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

  @OneToOne(() => File, undefined, {
    nullable: true,
    orphanRemoval: true,
    default: null,
    eager: true
  })
  avatar: MaybeNull<File> = null
}

type UserOptionalProps = PickKeys<User, "role" | "status">
