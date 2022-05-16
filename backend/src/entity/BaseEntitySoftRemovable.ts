import {ObjectType, Field} from "type-graphql"
import {Property} from "@mikro-orm/core"

import DatesWithDeleted from "api/type/common/DatesWithDeleted"
import type {MaybeNull} from "helper/type/MaybeNull"

import {BaseEntityWithDates} from "./BaseEntityWithDates"

@ObjectType({isAbstract: true})
export abstract class BaseEntitySoftRemovable extends BaseEntityWithDates {
  @Property({type: Date, nullable: true})
  deletedAt!: MaybeNull<Date>

  @Field(() => DatesWithDeleted)
  get dates(): DatesWithDeleted {
    return {
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    }
  }
}
