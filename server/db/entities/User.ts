import {
  Entity,
  Property,
  Enum,
  Unique,
  OneToOne,
  LoadStrategy
} from "@mikro-orm/mysql"
import type {Opt, Hidden} from "@mikro-orm/mysql"

import type {MaybeNull} from "../../..//lib/utils/types/MaybeNull.js"
import {stringEnumValues} from "../../../lib/utils/stringEnumValues.js"
import type {OImageMetadata} from "../../lib/types/common/ImageMetadata.js"

import {UserStatuses} from "../../trpc/types/user/UserStatuses.js"
import {UserRoles} from "../../trpc/types/user/UserRoles.js"

import {RecordSoft} from "./RecordSoft.js"
import {File} from "./File.js"

@Entity()
export class User extends RecordSoft {
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
  password!: Hidden<string>

  /**
   * Indicates which role user were assigned to.
   */
  @Enum({type: "string", items: stringEnumValues(UserRoles)})
  role: Opt<UserRoles> = UserRoles.Regular

  /**
   * Indecates user's account status.
   */
  @Enum({type: "string", items: stringEnumValues(UserStatuses)})
  status: Opt<UserStatuses> = UserStatuses.Inactive

  @OneToOne(() => File, undefined, {
    nullable: true,
    orphanRemoval: true,
    default: null,
    eager: true,
    strategy: LoadStrategy.JOINED
  })
  avatar: MaybeNull<File<OImageMetadata>> = null
}
