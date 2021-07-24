import {ObjectType, Field, registerEnumType} from "type-graphql"
import {IsEmail, Matches} from "class-validator"
import {
  Entity,
  Property,
  Enum,
  OneToOne,
  EntityRepositoryType
} from "@mikro-orm/core"

import {ExcludeSoftRemovedFilter} from "app/db/filter/ExcludeSoftRemovedFilter"
import {UserRepo} from "repo/UserRepo"

import {BaseEntitySoftRemovable} from "./BaseEntitySoftRemovable"
import {File} from "./File"

export enum UserRoles {
  ROOT = "root",
  ADMIN = "admin",
  REGULAR = "regular"
}

export enum UserStatuses {
  INACTIVE = "inactive",
  ACTIVE = "active",
  BANNED = "banned",
  SUSPENDED = "suspended"
}

export const LOGIN_PATTERN = /^[a-z0-9._-]+$/i

registerEnumType(UserRoles, {name: "UserRoles"})
registerEnumType(UserStatuses, {name: "UserStatuses"})

@ObjectType()
@Entity({customRepository: () => UserRepo})
@ExcludeSoftRemovedFilter()
export class User extends BaseEntitySoftRemovable {
  [EntityRepositoryType]?: UserRepo

  @Field()
  @Property({unique: true})
  @Matches(LOGIN_PATTERN)
  login!: string

  /**
   * Email address (private),
   */
  @Field()
  @Property({unique: true})
  @IsEmail()
  email!: string

  /**
   * Password (will be hashed once the user is created & persisted).
   */
  @Property()
  password!: string

  /**
   * Indicates which role user were assigned to.
   */
  @Field(() => String)
  @Enum(() => UserRoles)
  role: UserRoles = UserRoles.REGULAR

  /**
   * Indecates user's account status.
   */
  @Field(() => String)
  @Enum(() => UserStatuses)
  status: UserStatuses = UserStatuses.INACTIVE

  /**
   * User avatar,
   */
  @Field(() => File, {nullable: true})
  @OneToOne({entity: () => File, nullable: true, eager: true})
  avatar!: File | null
}
