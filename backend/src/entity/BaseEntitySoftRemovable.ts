import {ObjectType, Field} from "type-graphql"
import {Property} from "@mikro-orm/core"

import Dates from "api/type/common/Dates"

import {BaseEntityWithDates} from "./BaseEntityWithDates"

@ObjectType({isAbstract: true})
export abstract class BaseEntitySoftRemovable extends BaseEntityWithDates {
  @Field(() => Date, {nullable: true})
  @Property({type: Date, nullable: true})
  deletedAt!: Date | null

  @Field(() => Dates)
  get dates(): Dates {
    return {
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    }
  }
}
