import {ObjectType, Field} from "type-graphql"
import {Property} from "@mikro-orm/core"

import DatesWithDeleted from "api/type/common/DatesWithDeleted"

import {BaseEntityWithDates} from "./BaseEntityWithDates"

@ObjectType({isAbstract: true})
export abstract class BaseEntitySoftRemovable extends BaseEntityWithDates {
  @Field(() => Date, {nullable: true})
  @Property({type: Date, nullable: true})
  deletedAt!: Date | null

  @Field(() => DatesWithDeleted)
  get dates(): DatesWithDeleted {
    return {
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    }
  }
}
