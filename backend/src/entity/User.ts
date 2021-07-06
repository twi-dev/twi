import {ObjectType, Field, registerEnumType} from "type-graphql"
import {Entity, Column, OneToOne, JoinColumn} from "typeorm"
import {IsEmail, Matches} from "class-validator"

import SoftRemovableEntity from "entity/abstract/AbstractSoftRemovableEntity"

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

export const LOGIN_PATTERN = /^[a-z0-9._\-]+$/i

registerEnumType(UserRoles, {name: "UserRoles"})
registerEnumType(UserStatuses, {name: "UserStatuses"})

@ObjectType()
@Entity()
export class User extends SoftRemovableEntity {
  @Field()
  @Column({unique: true})
  @Matches(LOGIN_PATTERN)
  login!: string

  /**
   * User email address.
   */
  @Column({unique: true})
  @IsEmail()
  email!: string

  /**
   * User password.
   */
  @Column()
  password!: string

  /**
   * Indicates which role user were assigned to.
   */
  @Field(() => String)
  @Column({type: "enum", enum: UserRoles, default: UserRoles.REGULAR})
  role!: UserRoles

  /**
   * Indecates user's account status.
   */
  @Field(() => String)
  @Column({type: "enum", enum: UserStatuses, default: UserStatuses.INACTIVE})
  status!: UserStatuses

  /**
   * User avatar.
   */
  @Field(() => File, {nullable: true})
  @OneToOne(() => File, {eager: true, onDelete: "SET NULL", nullable: true})
  @JoinColumn()
  avatar!: File | null
}
