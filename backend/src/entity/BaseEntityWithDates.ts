import {ObjectType, Field} from "type-graphql"
import {Property} from "@mikro-orm/core"

import Dates from "api/type/common/Dates"

import {BaseEntity} from "./BaseEntity"

@ObjectType({isAbstract: true})
export abstract class BaseEntityWithDates extends BaseEntity {
  @Field(() => Date)
  @Property()
  createdAt: Date = new Date()

  @Field(() => Date)
  @Property({onUpdate: () => new Date()})
  updatedAt: Date = new Date()

  @Field(() => Dates)
  get dates(): Dates {
    return {
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
