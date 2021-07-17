import {CreateDateColumn, UpdateDateColumn} from "typeorm"
import {ObjectType, Field} from "type-graphql"

import Dates from "api/type/common/Dates"

import {BaseEntity} from "./BaseEntity"

@ObjectType({isAbstract: true})
export abstract class BaseEntityWithDates extends BaseEntity {
  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @Field(() => Dates)
  get dates(): Dates {
    return {
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
